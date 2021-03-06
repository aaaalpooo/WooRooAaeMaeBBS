package com.killi8n.bbs.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.killi8n.bbs.lib.HashPassword;
import com.killi8n.bbs.lib.JWTGenerator;
import com.killi8n.bbs.models.Account;
import com.killi8n.bbs.services.accounts.AccountService;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private Environment env;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> register(@RequestBody Account account, HttpServletResponse response) {

        String username = account.getUsername();
        String password = account.getPassword();
        String email = account.getEmail();

        Map<String, Object> resultMap = new HashMap<>();

        if (username == null) {
            resultMap.put("success", false);
            resultMap.put("username", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
        if (password == null) {
            resultMap.put("success", false);
            resultMap.put("password", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
        if (email == null) {
            resultMap.put("success", false);
            resultMap.put("email", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.isAlphanumeric(username) || username.length() < 6) {
            resultMap.put("success", false);
            resultMap.put("validation", true);
            resultMap.put("username", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        if (!StringUtils.isAlphanumeric(password) || password.length() < 6) {
            resultMap.put("success", false);
            resultMap.put("validation", true);
            resultMap.put("password", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        if (!EmailValidator.getInstance().isValid(email)) {
            resultMap.put("success", false);
            resultMap.put("validation", true);
            resultMap.put("email", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        try {

            Account existingAccount = accountService.checkExistingUsername(username);
            if (existingAccount != null) {
                resultMap.put("success", false);
                resultMap.put("existing", true);
                resultMap.put("username", true);
                return new ResponseEntity<>(resultMap, HttpStatus.CONFLICT);
            }

            existingAccount = accountService.checkExistingEmail(email);

            if (existingAccount != null) {
                resultMap.put("success", false);
                resultMap.put("existing", true);
                resultMap.put("email", true);
                return new ResponseEntity<>(resultMap, HttpStatus.CONFLICT);
            }

            HashPassword hashPassword = new HashPassword(env.getProperty("security.hashkey"));
            String hashedPassword = hashPassword.encrypt(account.getPassword());
            account.setPassword(hashedPassword);

            accountService.register(account);

            JWTGenerator generator = new JWTGenerator(env.getProperty("security.jwtkey"));
            String token = generator.Generate(account);

            resultMap.put("success", true);
            resultMap.put("token", token);
            resultMap.put("username", account.getUsername());

            Cookie tokenCookie = new Cookie("token", token);
            tokenCookie.setMaxAge(1000 * 60 * 60 * 24 * 7);
            response.addCookie(tokenCookie);

            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("success", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> login(@RequestBody Account account, HttpServletResponse response) {

        Map<String, Object> resultMap = new HashMap<>();

        String username = account.getUsername();
        String password = account.getPassword();

        if (username == null || username.trim().equals("")) {
            resultMap.put("success", false);
            resultMap.put("username", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
        if (password == null || password.trim().equals("")) {
            resultMap.put("success", false);
            resultMap.put("password", true);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        try {

            Account existingAccount = accountService.checkExistingUsername(username);
            if (existingAccount == null) {
                resultMap.put("success", false);
                resultMap.put("existing", false);
                return new ResponseEntity<>(resultMap, HttpStatus.NOT_FOUND);
            }

            HashPassword hashPassword = new HashPassword(env.getProperty("security.hashkey"));
            String decodedPassword = hashPassword.decrypt(existingAccount.getPassword());

            if (!password.equals(decodedPassword)) {
                resultMap.put("success", false);
                resultMap.put("password", false);
                return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED);
            }

            account.setEmail(existingAccount.getEmail());

            JWTGenerator jwtGenerator = new JWTGenerator(env.getProperty("security.jwtkey"));
            String token = jwtGenerator.Generate(account);
            resultMap.put("success", true);
            resultMap.put("token", token);

            Cookie tokenCookie = new Cookie("token", token);
            tokenCookie.setMaxAge(1000 * 60 * 60 * 24 * 7);
            response.addCookie(tokenCookie);

            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("success", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Boolean>> checkLogged(@RequestHeader(value = "Authorization") String token) {

        Map<String, Boolean> resultMap = new HashMap<>();

        try {
            JWTGenerator jwtGenerator = new JWTGenerator(env.getProperty("security.jwtkey"));
            Boolean verified = jwtGenerator.Verify(token);
            if (!verified) {
                resultMap.put("logged", false);
                return new ResponseEntity<>(resultMap, HttpStatus.UNAUTHORIZED);
            }

            resultMap.put("logged", true);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("logged", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Boolean>> logout(@RequestHeader(value = "Authorization") String token,
            HttpServletResponse response) {
        Map<String, Boolean> resultMap = new HashMap<>();
        try {
            Cookie tokenCookie = new Cookie("token", null);
            tokenCookie.setMaxAge(0);
            response.addCookie(tokenCookie);

            resultMap.put("success", true);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("success", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}