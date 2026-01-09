import './style.css'

async function getData() {
  try{
    const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&pageNumber=2');
    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    } 
    else { 
      const data = await response.json();
      data.forEach((item) => console.log(item));
      inject(data);
    }
  } catch (error) {
    console.log(error);
  }
}

getData();

function inject(data) {
  const container = document.querySelector(".container");
  data.forEach((item) => {
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="w-[22%] border-2 border-black rounded-[10px] flex flex-col overflow-hidden items-center justify-between font-sans font-normal">
        <h2 class="card-header">${item.title}</h2>
        <img class="card-img" src="${item.thumb}" alt="${item.title}" />
        <div>Steam Ratings: ${item.steamRatingText} (${item.steamRatingPercent}%)</div>
        <p>Price: <span class="line-through">$${item.normalPrice}</span> $${item.salePrice}</p>
        <p class="card-savings">Savings: $${(item.normalPrice - item.salePrice).toFixed(2)} (${Math.round(item.savings)}%)</p>
      </div>
    `
    );
  });
}