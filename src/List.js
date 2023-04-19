import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = (props) => {
  console.log(props)
  return (
    <div className='grocery-list'>
      {props.item?.map((item) => {
        const { id, title } = item;
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={()=>props.editItem(id)}
                >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={()=>props.removeItem(id)}
                >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
