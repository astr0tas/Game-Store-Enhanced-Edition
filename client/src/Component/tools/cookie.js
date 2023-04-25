export function checkCookie(cookieName)
{
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++)
      {
            var cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName + '=') === 0)
            {
                  return true;
            }
      }
      return false;
}

export function deleteCookie(name)
{
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// export function getCookie(cookieName)
// {
//       const cookies = document.cookie.split("; ");
//       for (let i = 0; i < cookies.length; i++)
//       {
//             const [name, value] = cookies[i].split("=");
//             if (name === cookieName)
//             {
//                   return decodeURIComponent(value);
//             }
//       }
//       return "";
// }