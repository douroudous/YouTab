import React from 'react';

const String  = props => {


  let string = props.stringLine;
  let entry = props.entry;
  let line = ["|---"];
  for (var i = 0; i < string.length; i++){
    if (string[i] != ""){
      line.push(string[i]);
    } else {
      line.push('-');
    }
    line.push('---');
  }
  line.push(entry);
  line.push('---|');
  line.join('');

  return(
    <div className="App row">
      <div className='columns small-1'>
          <form className="form">
            <input id={props.id} onChange={props.handleFormSubmit} type="text"/>
          </form>
      </div>
      <div className='text columns small-11'>
          {props.open} {line}
      </div>
    </div>
  );
};

export default String;
