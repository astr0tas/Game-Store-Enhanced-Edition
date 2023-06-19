export const isRefValid = (ref, idx = -1) =>
{
      if (idx === -1)
            return ref.current !== null && ref.current !== undefined && ref.current !== '' && ref.current !== 'undefined' && ref.current !== 'null';
      return ref.current[idx] !== null && ref.current[idx] !== undefined && ref.current[idx] !== '' && ref.current[idx] !== 'undefined' && ref.current[idx] !== 'null';
}

export const isRefNotValid = (ref, idx = -1) =>
{
      if (idx === -1)
            return ref.current === null || ref.current === undefined || ref.current === '' || ref.current === 'undefined' || ref.current === 'null';
      return ref.current[idx] === null || ref.current[idx] === undefined || ref.current[idx] === '' || ref.current[idx] === 'undefined' || ref.current[idx] === 'null';
}