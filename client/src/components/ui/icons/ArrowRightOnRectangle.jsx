function ArrowRightOnRectangle({ size = "24", color = "#2F2F2F" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 9V5.25C15.75 4.65326 15.5129 4.08097 15.091 3.65901C14.669 3.23705 14.0967 3 13.5 3H7.5C6.90326 3 6.33097 3.23705 5.90901 3.65901C5.48705 4.08097 5.25 4.65326 5.25 5.25V18.75C5.25 19.3467 5.48705 19.919 5.90901 20.341C6.33097 20.7629 6.90326 21 7.5 21H13.5C14.0967 21 14.669 20.7629 15.091 20.341C15.5129 19.919 15.75 19.3467 15.75 18.75V15M18.75 15L21.75 12M21.75 12L18.75 9M21.75 12H9"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowRightOnRectangle;
