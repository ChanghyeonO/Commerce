export const fetchItems = async (page = 1) => {
  const itemsPerPage = 12;
  const totalItems = 60;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const items = Array.from({ length: totalItems }, (_, index) => ({
    id: index + 1,
    name: `제품 ${index + 1}`,
    price: `${10000 + index * 500}원`,
    description: `제품 설명 ${index + 1}`,
    imageUrl1: `https://via.placeholder.com/150?text=Product+${index + 1}_1`,
    imageUrl2: `https://via.placeholder.com/150?text=Product+${index + 1}_2`,
    imageUrl3: `https://via.placeholder.com/150?text=Product+${index + 1}_3`,
    imageUrl4: `https://via.placeholder.com/150?text=Product+${index + 1}_4`,
    imageUrl5: `https://via.placeholder.com/150?text=Product+${index + 1}_5`,
    imageUrl6: `https://via.placeholder.com/150?text=Product+${index + 1}_6`,
  }));

  return {
    items: items.slice(start, Math.min(end, totalItems)),
    hasMore: end < totalItems,
  };
};
