import React, { useState, } from 'react';
import useQueryApi from './../hooks/useQueryApi';

const Nav = () => {

  const [param, setParam] = useState({});
  const [select, setSelect] = useState('');
  const [inputText, setInputText] = useState('');
  const [queryRes, loading] = useQueryApi(param);


  const handleSelect = (e) => {
    setSelect(e.target.value)
  }

  const handleInput = (e) => {
    setInputText(e.target.value);
  }

  const getData = (e) => {
    e.preventDefault();

    setParam({
      ...param, query: select, arg: inputText
    });
    setSelect('');
    setInputText('');

  }

  return (
    <nav>
      {!loading ? <h1>hello</h1> : <h1>searching...</h1>}

      <form onSubmit={getData}>

        <fieldset className={'paramSelector'}>
          <label htmlFor="searchParam">Search Param</label>
          <select name="searchParam" id="searchParam" onChange={handleSelect} value={select}>
            <option defaultValue>choose a parameter</option>
            <option value="users">find user</option>
            <option value="topics">topics (ie. Ruby)</option>
            <option value="repositories">find repos</option>
          </select>
        </fieldset>

        <fieldset className={'textInput'}>
          <label htmlFor="searchQuery">arg</label>
          <input
            type="text"
            id="searchQuery"
            onChange={handleInput}
            value={inputText} />
        </fieldset>

        <input type="submit" value="submit" />

      </form>
      <h2>{select}</h2>

      {
        queryRes &&
        <>
          <h3>{queryRes.name}</h3>
          <p>{queryRes.bio}</p>
          <h5>{queryRes.followers}</h5>
          <h5>{queryRes.public_repos}</h5>
        </>
      }

    </nav>
  )
}
export default Nav;