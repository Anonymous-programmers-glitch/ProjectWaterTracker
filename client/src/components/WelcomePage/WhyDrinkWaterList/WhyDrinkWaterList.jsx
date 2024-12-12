export default function WhyDrinkWaterList({ data }) {
  return (
    <>
      <h3>Why drink water</h3>
      <ul>
        {data.map((item) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </>
  );
}
