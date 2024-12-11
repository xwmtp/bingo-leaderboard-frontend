export async function fetchData(url: string) {
  const response = await fetch(encodeURI(url), {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status / 100 !== 2) {
    throw Error(`Error occurred while fetching url ${url}: ${response.statusText}`);
  }

  const x = response.json();
  console.log(JSON.stringify(x, null, 1));

  return x;
}
