export const mockPrd = {
  summary:
    'An AI-powered workspace that converts product ideas into structured product requirements.',

  problemStatement:
    'Product teams often struggle to transform early-stage ideas into clear and structured requirements.',

  targetUsers: [
    'Product Managers',
    'Business Analysts',
    'Startup Founders',
  ],

  goals: [
    'Speed up PRD creation',
    'Improve requirement quality',
    'Create a consistent product documentation structure',
  ],

  nonGoals: [
    'Replace product managers',
    'Automatically develop the product',
  ],

  userStories: [
    'As a product manager, I want to describe my product idea so that I can generate a structured PRD.',
    'As a business analyst, I want to review generated requirements so that I can refine them.',
  ],

  functionalRequirements: [
    'The system shall allow users to create a project.',
    'The system shall generate a structured PRD for a project.',
    'The system shall display the generated PRD in the workspace.',
  ],

  nonFunctionalRequirements: [
    'The system should return project data within 2 seconds.',
    'The application should provide a responsive user interface.',
  ],

  acceptanceCriteria: [
    'A project can be created with all required fields.',
    'A PRD is associated with the created project.',
  ],

  risks: [
    'Generated requirements may be incomplete.',
    'User input may not contain enough product information.',
  ],

  openQuestions: [
    'Which AI model will generate the PRD?',
    'Should users be able to edit generated sections?',
  ],
}