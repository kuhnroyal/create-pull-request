import { getInput } from "@actions/core/lib/core";

interface Inputs {
  base: string;
  head: string;
  draft?: boolean;
  title: string;
  body?: string;
  owner: string;
  repo: string;
  reviewers: string[];
}

export function getInputs(): Inputs {
  const head = getInput("head", { required: true });
  const title = getInput("title", { required: true });
  const base = getInput("base") || "master";
  const draft = getInput("draft") ? JSON.parse(getInput("draft")) : undefined;
  const body = getInput("body") || undefined;
  const reviewers = getInput("reviewers");

  const githubRepository = process.env.GITHUB_REPOSITORY;

  if (!githubRepository) {
    throw new Error("GITHUB_REPOSITORY is not set");
  }

  const [owner, repo] = githubRepository.split("/");

  return {
    head,
    base,
    title,
    draft,
    body,
    owner,
    repo,
    reviewers: reviewers
      ? reviewers.split(",").map(reviewer => reviewer.trim())
      : []
  };
}