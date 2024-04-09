export const  convertStringToNumber = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const paddedHours = hours.padStart(2, '0'); // Ensure hours are 2 digits padded with 0 if necessary
    const paddedMinutes = minutes.padStart(2, '0'); // Ensure minutes are 2 digits padded with 0 if necessary
    return parseInt(paddedHours + paddedMinutes);
  };
