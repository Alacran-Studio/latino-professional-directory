const SchoolIcon = ({ width = 88, height = 72, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 88 72`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} `}
    >
      <path
        d="M44 0L0 24L16 32.72V56.72L44 72L72 56.72V32.72L80 28.36V56H88V24L44 0ZM71.28 24L44 38.88L16.72 24L44 9.12L71.28 24ZM64 51.96L44 62.88L24 51.96V37.08L44 48L64 37.08V51.96Z"
        fill="#8FB8DE"
      />
    </svg>
  );
};

export default SchoolIcon;
