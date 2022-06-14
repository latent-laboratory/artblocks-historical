async function query_artblocks(query) {
  const response = await fetch("https://api.thegraph.com/subgraphs/name/artblocks/art-blocks", {
    method: "post",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ query })
  })
  const result = await response.json()
  if (result.errors) {
    console.log(result.errors[0].message)
    return null
  } else {
    return result.data
  }
}

async function query_projects(address) {
  let { projects } = await query_artblocks(
`{
  projects(orderBy: projectId, where: {artistAddress: "${address}"}) {
    contract {
      id
    }
    projectId
    artistName
    invocations
  }
}`)
  return projects
}

export async function get_contract_token_ids(address) {
  return query_projects(address).then(x => {
    if (x.length > 0) {
      return x.map((y) => {
        return [...Array(parseInt(y.invocations))].map((z, i) => (
          {address: y.contract.id, tokenId: parseInt(y.projectId*1e6+i)}
        ))
      }).flat()
    } else {
      return []
    }
  })
}
