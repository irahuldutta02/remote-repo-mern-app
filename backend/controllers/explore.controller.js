export const getRepoByLanguage = async (req, res) => {
  const { language } = req.params;
  console.log(language);
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
