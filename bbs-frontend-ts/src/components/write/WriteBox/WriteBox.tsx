import * as React from 'react';
import styles from './WriteBox.scss';
import * as classNames from 'classnames/bind';
import Textarea from 'react-textarea-autosize';

const cx = classNames.bind(styles);

interface WriteBoxProps {
  text: string;
  onChange(text: string): void;
}

const WriteBox: React.SFC<WriteBoxProps> = ({ text, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <div className={cx('WriteBoxWrapper')}>
      <Textarea
        minRows={3}
        maxRows={30}
        placeholder={`대원이 나눌만한 이야깃거리를 풀어라.`}
        className={cx('Textarea')}
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default WriteBox;
