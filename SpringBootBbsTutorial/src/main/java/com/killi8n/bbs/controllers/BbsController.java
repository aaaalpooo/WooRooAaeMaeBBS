package com.killi8n.bbs.controllers;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.killi8n.bbs.lib.JWTGenerator;
import com.killi8n.bbs.models.Post;
import com.killi8n.bbs.services.posts.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/bbs")
public class BbsController {

    @Autowired
    private PostService postService;

    @Autowired
    private Environment env;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> create(@RequestHeader(value = "Authorization") String token,
            @RequestBody Post post) {

        Map<String, Object> resultMap = new HashMap<>();

        Boolean verified = false;

        try {

            JWTGenerator generator = new JWTGenerator(env.getProperty("security.jwtkey"));
            verified = generator.Verify(token);

            if (!verified) {
                resultMap.put("success", "false");
                resultMap.put("error", "token");
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            RestTemplate restTemplate = new RestTemplate();
            final String uri = env.getProperty("ws.uri");
            Map<String, Integer> result = restTemplate.postForObject(uri, post, Map.class);
            Integer lastId = result.get("lastId");

            Post lastPost = postService.read(Long.parseLong(lastId + ""));
            resultMap.put("success", true);
            resultMap.put("lastPost", lastPost);

            return new ResponseEntity<>(resultMap, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("success", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> list(@RequestParam(value = "page", defaultValue = "0") int page) {

        if (page == 0) {
            page = 1;
        }

        if (page < 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Map<String, Object> resultMap = new HashMap<>();
        List<Post> pagedList;

        try {
            pagedList = postService.pagedList((page - 1) * 10);
            resultMap.put("list", pagedList);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Map<String, Object>> read(@PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        Post post;
        try {
            post = postService.read(id);
            resultMap.put("post", post);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Map<String, Object>> remove(@RequestHeader(value = "Authorization") String token,
            @PathVariable Long id) {
        Map<String, Object> resultMap = new HashMap<>();
        try {

            JWTGenerator generator = new JWTGenerator(env.getProperty("security.jwtkey"));
            Boolean verified = generator.Verify(token);

            if (!verified) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            String tokenUsername = generator.VerifyUser(token);

            Post post = postService.read(id);

            if (!tokenUsername.equals(post.getUsername())) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            postService.remove(id);
            resultMap.put("success", true);
            return new ResponseEntity<>(resultMap, HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("success", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Map<String, Object>> update(@RequestHeader(value = "Authorization") String token,
            @PathVariable Long id, @RequestBody Post post) {

        Map<String, Object> resultMap = new HashMap<>();
        try {

            JWTGenerator generator = new JWTGenerator(env.getProperty("security.jwtkey"));
            Boolean verified = generator.Verify(token);

            if (!verified) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            post.setId(id);

            Date nowDate = new Date();
            post.setUpdatedAt(nowDate);

            postService.update(post);

            resultMap.put("success", true);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            resultMap.put("success", false);
            return new ResponseEntity<>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
