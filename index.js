export async function obj(amount = 5, difficulty = "easy") {
    let url = `https://opentdb.com/api.php?amount=${amount}&category=15`
    if (difficulty) {
        url += `&difficulty=${difficulty}`
    }
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Failed to fetch quiz questions: ${res.statusText}`)
    }
    const data = await res.json()
    return data.results || []
}
