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

export function deleteCustomerCookie()
{
      document.cookie = 'PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}

export function deleteAdminCookie()
{
      document.cookie = 'PHPADMINSESSID=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/admin';
}