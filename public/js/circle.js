function setProgress(percentage) {
  const circle = document.querySelector(".progress-circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  // Set the stroke-dasharray and stroke-dashoffset for the progress circle
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference - percentage * circumference;
}
