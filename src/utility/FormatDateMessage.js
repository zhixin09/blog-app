const FormatDateMessage = (currentDate, commentDate) => {
  const differenceInMilliseconds =
    currentDate.getTime() - commentDate.getTime();
  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;
  const differenceInWeeks = differenceInDays / 7;
  const differenceInMonths = differenceInDays / 30;
  const differenceInYears = differenceInMonths / 12;

  const formatTimeMessage = (num, unit) => {
    return `${num} ${unit}${num === 1 ? '' : 's'} ago`;
  };

  let timeAgoMessage = '';
  if (differenceInYears >= 1) {
    timeAgoMessage = formatTimeMessage(Math.floor(differenceInYears), 'year');
  } else if (differenceInMonths >= 1) {
    timeAgoMessage = formatTimeMessage(Math.floor(differenceInMonths), 'month');
  } else if (differenceInWeeks >= 2) {
    timeAgoMessage = formatTimeMessage(Math.floor(differenceInWeeks), 'week');
  } else if (differenceInDays >= 1) {
    timeAgoMessage = formatTimeMessage(Math.floor(differenceInDays), 'day');
  } else if (differenceInHours >= 1) {
    timeAgoMessage = formatTimeMessage(Math.floor(differenceInHours), 'hour');
  } else if (differenceInMinutes >= 1) {
    timeAgoMessage = formatTimeMessage(
      Math.floor(differenceInMinutes),
      'minute'
    );
  } else {
    timeAgoMessage = 'Just now';
  }

  return timeAgoMessage;
};

export default FormatDateMessage;
