export const fetchItems = async (page = 1) => {
  const itemsPerPage = 4;
  const totalItems = 61;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const items = Array.from({ length: totalItems }, (_, index) => ({
    id: index + 1,
    name: `제품 ${index + 1}`,
    price: `${10000 + index * 500}`,
    description: `제품 설명 ${index + 1}`,
    itemDescription: [
      {
        imageUrl: `https://via.placeholder.com/150?text=Product+${index + 1}_1`,
        description: `제품 설명 ${index + 1}_1`,
      },
      {
        imageUrl: `https://via.placeholder.com/150?text=Product+${index + 1}_2`,
        description: `제품 설명 ${index + 1}_2`,
      },
      {
        imageUrl: `https://via.placeholder.com/150?text=Product+${index + 1}_3`,
        description: `제품 설명 ${index + 1}_3`,
      },
      {
        imageUrl: `https://via.placeholder.com/150?text=Product+${index + 1}_4`,
        description: `제품 설명 ${index + 1}_4`,
      },
      {
        imageUrl: `https://via.placeholder.com/150?text=Product+${index + 1}_5`,
        description: `제품 설명 ${index + 1}_5`,
      },
      {
        imageUrl: `https://via.placeholder.com/150?text=Product+${index + 1}_6`,
        description: `제품 설명 ${index + 1}_6`,
      },
    ],
  }));

  return {
    items: items.slice(start, Math.min(end, totalItems)),
    hasMore: end < totalItems,
  };
};
