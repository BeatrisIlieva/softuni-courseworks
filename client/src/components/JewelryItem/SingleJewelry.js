export const SingleJewelry = ({ _id, firstImageUrl, title }) => {
  return (
    <div>
      <p>{title}</p>
      <img src={firstImageUrl} alt={title} />
      <p>{_id}</p>
    </div>
  );
};
