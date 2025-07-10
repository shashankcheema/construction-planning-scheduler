// Utility to call OpenAI API for schedule generation
function extractFirstJsonObject(text: string): string | null {
  // Remove markdown code fencing
  text = text.replace(/```(json)?/gi, '').trim();
  // Find the first {...} block
  const match = text.match(/{[\s\S]*}/);
  return match ? match[0] : null;
}

export async function generateScheduleWithOpenAI({ areaStatement, apiKey }: { areaStatement: any, apiKey: string }): Promise<any> {
  const prompt = `You are a construction planning assistant. Given a valid area statement JSON (see below), generate a detailed construction schedule as a JSON array, grouped by standard construction phases.

Input:
A JSON object with this structure (example):
${JSON.stringify(areaStatement, null, 2)}

Construction Phases (in order):
1. Site Clearance & Layout
2. Excavation
3. Footings
4. Column up to Plinth
5. Plinth Beam
6. Backfilling
7. Ground Floor Slab
8. Column up to Roof Level
9. Roof Beam & Slab
10. Brick Work
11. Plastering
12. Flooring
13. Painting
14. Water Supply & Sanitary
15. Electrical
16. Compound Wall
17. Septic Tank & Sump
18. Overhead Water Tank
19. Final Finishing / Handing Over

For each task, include:
- sl_no (number)
- section (phase name)
- description (task description)
- quantity (with unit, e.g. "45.0 Cu.m")
- unit (e.g. "Cu.m", "Sq.m", "Nos", "Rmt")
- start_date (YYYY-MM-DD)
- end_date (YYYY-MM-DD)
- duration_days (integer)
- (optional) notes (for critical path or special remarks)

Sequencing:
- Use logical construction sequencing and standard daily productivity.
- Dates should be sequential and not overlap unless parallel execution is realistic.
- Ensure all phases are covered.

Gantt Timeline Support:
- Output a gantt array for timeline visualization:
"gantt": [
  {
    "task_id": "T1",
    "task_name": "Excavation for Footings",
    "start": "2025-07-01",
    "end": "2025-07-03",
    "section": "Footings"
  }
]

Output Format:
Return a single JSON object:
{
  "project_metadata": { ... }, // Extracted from input if available
  "schedule": [ ... ],         // Array of tasks as above
  "gantt": [ ... ]             // For timeline
}
Do not include explanations, markdown, or any text outside the JSON.
If the input is missing required fields, return a JSON error message.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'You are an expert construction scheduler.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 2048
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  const content = data.choices[0].message.content;
  try {
    const jsonString = extractFirstJsonObject(content);
    if (!jsonString) throw new Error('No JSON object found in OpenAI response.');
    return JSON.parse(jsonString);
  } catch (e) {
    // Show the raw response for debugging
    throw new Error('Failed to parse schedule JSON from OpenAI response.\n\nRaw response:\n' + content);
  }
} 