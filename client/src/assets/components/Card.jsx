const Card = ({ title, value, color }) => {
  return (
    <div
      className={`${color} rounded-xl shadow-lg p-6 text-white hover:scale-105 transition`}
    >
      <h3 className="text-lg">{title}</h3>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
};

export default Card;