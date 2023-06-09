import { jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addMessageThunk, setMessageThunk } from '../../redux/slices/chatSlice';

export default function chat(): JSX.Element {
  const [input, setInput] = useState('');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setMessageThunk(Number(input)));
  }, [input]);

  const UserMassage = useAppSelector((store) => store.UserMessage);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = Object.fromEntries(new FormData(e.currentTarget));
    dispatch({ type: 'SEND_MESSAGE', payload: { recipientId: input, message } });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input name="message" type="text" />
        <button type="submit">Send</button>
      </form>

      <input value={input} onChange={changeHandler} type="text" />
      {UserMassage?.map((el) => (
        <div>{el.message}</div>
      ))}
    </div>
  );
}
