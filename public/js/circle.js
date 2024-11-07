function setProgress(percentage) {
  const circle = document.querySelector(".progress-circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference - percentage * circumference;
}
