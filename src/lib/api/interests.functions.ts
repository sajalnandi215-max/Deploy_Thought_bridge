import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Save user interests to Firestore using REST API
export const saveUserInterests = createServerFn({ method: "POST" })
  .inputValidator(z.object({ 
    userId: z.string(),
    interests: z.array(z.string())
  }))
  .handler(async ({ data }) => {
    try {
      const projectId = "thoughtbridge-25673";
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${data.userId}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            interests: {
              arrayValue: {
                values: data.interests.map((interest) => ({
                  stringValue: interest,
                })),
              },
            },
            updatedAt: {
              timestampValue: new Date().toISOString(),
            },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Firestore API error: ${JSON.stringify(error)}`);
      }

      return { success: true, interests: data.interests };
    } catch (error) {
      console.error("Error saving interests:", error);
      throw new Error(`Failed to save interests: ${error}`);
    }
  });

// Fetch user interests from Firestore using REST API
export const getUserInterests = createServerFn({ method: "GET" })
  .inputValidator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    try {
      const projectId = "thoughtbridge-25673";
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${data.userId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Firestore API error: ${response.statusText}`);
      }

      const doc = await response.json();
      const interests = doc.fields?.interests?.arrayValue?.values?.map(
        (v: any) => v.stringValue
      ) || [];

      return { interests };
    } catch (error) {
      console.error("Error fetching interests:", error);
      throw new Error(`Failed to fetch interests: ${error}`);
    }
  });
