export type PollCreateRequest = {
  question: string;
  options: string[];
}

export type PollCreatedResponse = {
  createdAt: string;
  id: string;
} & PollCreateRequest;

const baseUrl = "https://6626a09d052332d553238268.mockapi.io/api/polls-austin-butler";

export async function createPoll(poll: PollCreateRequest): Promise<PollCreatedResponse> {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poll),
  });

  return response.json();
}