const Excerpt = (text, maxLength) => {
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + ' ... ';
  }
  return text;
};

export default Excerpt;
