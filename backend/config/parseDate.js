const parseDateString = (dateString) => {
    // Split the date and time
    const [datePart, timePart] = dateString.split(' ');
  
    // Split date parts
    const [month, day, year] = datePart.split('/').map(Number);
  
    // Split time parts
    const [hours, minutes] = timePart.split(':').map(Number);
  
    // Construct a Date object
    return new Date(year, month - 1, day, hours + 2, minutes);
};
  
module.exports = { parseDateString };