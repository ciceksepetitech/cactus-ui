import { useArray } from '@ciceksepeti/cui-hooks';
import React from 'react';

import PreviewContainer from '../../Containers/PreviewContainer/PreviewContainer';

function Array() {
  const {
    set,
    map,
    push,
    find,
    clear,
    value,
    remove,
    filter,
    isEmpty,
    includes,
    findIndex,
  } = useArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const isEmptyChecker = isEmpty();
  const includesChecker = includes(5);

  return (
    <div>
      <PreviewContainer title="Value">
        <p>Value returns given initial array.</p>
        <div>
          {value.length > 0 ? (
            value.join(', ')
          ) : (
            <>
              <span className="fw-800">INFO TEXT:</span>
              <span> Array is empty</span>
            </>
          )}
        </div>
      </PreviewContainer>

      <PreviewContainer title="isEmpty Method">
        <p>The isEmpty() method checks whether given array is empty or not.</p>
        <span>
          {isEmptyChecker ? 'Array list is empty' : 'Array list is NOT empty'}
        </span>
      </PreviewContainer>

      <PreviewContainer title="push Method" contentType="PREVIEW & TEST AREA">
        <div>
          <span className="fw-800">
            <span className="fw-800">Array: </span>
          </span>
          {value.join(', ')}
        </div>
        <p>
          The push() method adds one or more elements to the end of an array and
          returns the new length of the array.
        </p>
        <p>Click to push a random number into array</p>
        <button
          onClick={() => push(Math.floor(Math.random() * 20) + 10)}
          className="p-10"
        >
          Push
        </button>
      </PreviewContainer>

      <PreviewContainer title="set Method" contentType="PREVIEW & TEST AREA">
        <div>
          <span className="fw-800">Array: </span>
          {value.join(', ')}
        </div>
        <p>Click to set array as [99,98,97,96,95]</p>
        <button onClick={() => set([99, 98, 97, 96, 95])} className="p-10">
          Set
        </button>
        <span> </span>
      </PreviewContainer>

      <PreviewContainer title="includes Method">
        <p>
          The includes() method determines whether an array includes a certain
          value among its entries, returning true or false as appropriate.
        </p>
        <span>
          Does array includes 5 : {includesChecker ? 'True' : 'False'}
        </span>
      </PreviewContainer>

      <PreviewContainer title="remove Method" contentType="PREVIEW & TEST AREA">
        <div>
          <span className="fw-800">Array: </span>
          {value.join(', ')}
        </div>
        <p>
          The remove() method removes array elements starting from given index.
          For this example it's given 0 as starting index.
        </p>
        <button onClick={() => remove(0)} className="p-10">
          remove
        </button>
      </PreviewContainer>
      <PreviewContainer title="map Method">
        <p>
          The map() method creates a new array populated with the results of
          calling a provided function on every element in the calling array.
        </p>
        <span>Mapped Array: </span>
        <span className="fw-800">
          {map((k) => (
            <span key={k}>{` ( ${k} )`}</span>
          ))}
        </span>
      </PreviewContainer>
      <PreviewContainer title="find Method">
        <p>
          The find() method returns the first element in the provided array that
          satisfies the provided testing function.
        </p>
        <span>Find 5: </span>
        <span className="fw-800">
          {find((num) => num === 5) ? 'TRUE' : 'FALSE'}
        </span>
      </PreviewContainer>
      <PreviewContainer title="filter Method">
        <p>
          The filter() method creates a new array with all elements that pass
          the test implemented by the provided function.
        </p>
        <span>Print numbers greater than five : </span>
        <span className="fw-800">
          {filter((num) => num > 7).map((k) => {
            return <span key={k}> ( {k} )</span>;
          })}
        </span>
      </PreviewContainer>
      <PreviewContainer title="findIndex Method">
        <div>
          <span className="fw-800">Array: </span>
          {value.join(', ')}
        </div>
        <p>
          The findIndex() method returns the index of the first element in the
          array that satisfies the provided testing function. Otherwise, it
          returns -1, indicating that no element passed the test.
        </p>
        <div>
          <span>Index number of (9) is: </span>
          <span className="fw-800">{findIndex((num) => num === 9)}</span>
        </div>
        <div>
          <span> Index number of (100) is: </span>
          <span className="fw-800 ">{findIndex((num) => num === 100)}</span>
        </div>
      </PreviewContainer>

      <PreviewContainer title="clear Method" contentType="PREVIEW & TEST AREA">
        <div>
          <span className="fw-800">Array: </span>
          {value.join(', ')}
        </div>
        <p>The clear() method click to clears whole array list.</p>
        <button onClick={() => clear()} className="p-10">
          Clear
        </button>
      </PreviewContainer>
    </div>
  );
}

export default Array;
