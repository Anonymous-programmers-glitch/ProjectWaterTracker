function PlusSmallOutline({ size = "24" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6V18M18 12H6"
        stroke="#2F2F2F"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default PlusSmallOutline;
