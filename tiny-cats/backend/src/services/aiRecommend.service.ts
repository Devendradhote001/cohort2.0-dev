import { recommendService } from "./cat.service.ts";
import { generateAiResponse } from "./gemini.service.ts";

export const aiRecommendService = async (
  kidsFriendly: boolean,
  apartmentFriendly: boolean
) => {
  const matchCatsFromDb = await recommendService(
    kidsFriendly,
    apartmentFriendly
  );

  const prompt = `
  You are an expert Cat Breed Consultant with deep knowledge of cat breeds, behavior, temperament, care requirements, health, family compatibility, and apartment suitability.
  
  Your task is to recommend and compare the most suitable cat breeds based on the user's preferences.
  
  User Preferences:
  - Kids Friendly: ${kidsFriendly}
  - Apartment Friendly: ${apartmentFriendly}
  
  Instructions:
  1. Analyze the user's preferences carefully.
  2. Recommend the top 5 most suitable cat breeds.
  3. Compare the breeds based on:
     - Temperament
     - Energy Level
     - Kid Friendliness
     - Apartment Suitability
     - Grooming Needs
     - Intelligence
     - Affection Level
     - Life Span
  4. Explain the pros and cons of each breed.
  5. Rank the breeds from best match to least suitable match.
  6. Provide a final recommendation explaining why the #1 breed is the best choice.
  7. Keep the response informative, professional, and easy to understand.
  8. Use clear headings and bullet points.
  9. Do not include fictional information.
  10. If no breed perfectly matches the requirements, explain the trade-offs.
  
  Response Format:
  
  # Best Cat Breed Matches
  
  ## 1. Breed Name
  Match Score: XX/100
  
  ### Why It Matches
  ...
  
  ### Pros
  - ...
  - ...
  
  ### Cons
  - ...
  - ...
  
  ### Key Characteristics
  - Energy Level:
  - Affection Level:
  - Grooming:
  - Life Span:
  - Kids Friendly:
  - Apartment Friendly:
  
  ---
  
  (Repeat for remaining breeds)
  
  # Final Recommendation
  Explain which breed is the best overall choice and why.
  `;

  const aiResponse = await generateAiResponse(prompt);

  return aiResponse;
};
