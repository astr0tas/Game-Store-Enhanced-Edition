import React from 'react';

function FormattedText({ text })
{
      // Make sure the text is not undefined or empty
      if (text === null || text === "")
      {
            return (
                  <p>N/A</p>
            );
      }

      // Define an array of strings to split the text at
      const splitPoints = ["OS:", "Memory:", "Graphics:", "DirectX:", "Storage:", "Additional Notes:"];

      // Loop through the split points and wrap them in a <strong> tag
      let formattedText = text;
      splitPoints.forEach((point) =>
      {
            const splitText = formattedText.split(point);
            formattedText = splitText.join(`<br><strong>${ point }</strong>`);
      });

      // Render the formatted text as HTML
      return (
            <p dangerouslySetInnerHTML={ { __html: formattedText } }></p>
      );
}

export default FormattedText;