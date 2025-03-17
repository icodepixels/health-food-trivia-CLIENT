
MVP Requirements:
	1.	Frontend (Next.js + Turbopack + Redux)
    •	Landing page with quiz categories (nutrition, sustainability, ethics, history, science, culture).
    •	Quiz interface with multiple-choice questions.
    •	Email submission form for tracking progress.
    •	Results page showing correct answers and score.
	2.	Backend (Python)
    •	API endpoints for:
    •	Fetching categories data.
    •	Fetching quiz data.
    •	Submitting quiz answers.
    •	Storing user email and quiz results.
    •	Simple input validation and error handling.
	3.	Database (SQLite)
    •	Users table (email, timestamp, results_id).
    •	Quizzes table (see Quiz model).
    •	Results table (user_id, quiz_id, score).
	4.	Additional Features
    •	Basic email format validation.
    •	Session management (using cookies or tokens for tracking progress).
    •	Endpoint to add or modify quizzes via Postman.




Quiz and questions JSON format:
{
  "quiz": {
    "name": "Vegan Nutrition: Balancing Essential Nutrients",
    "description": "Test your knowledge on key nutrients, potential deficiencies, and optimal food choices for a well-planned vegan diet.",
    "image": "vegan_nutrition_balance.jpg",
    "category": "nutrition",
    "difficulty": "hard"
  },
  "questions": [
    {
      "question_text": "Which nutrient, essential for vegans, requires careful planning or supplementation due to its absence in plant foods?",
      "choices": ["Vitamin C", "Vitamin B12", "Vitamin K", "Vitamin E"],
      "correct_answer_index": 1,
      "explanation": "Vitamin B12 is primarily found in animal products. Vegans must obtain it through supplements or fortified foods to prevent deficiency.",
      "image": "vitamin_b12_sources.jpg",
      "difficulty": "hard",
      "category": "nutrition"
    },
    {
      "question_text": "Which essential amino acid is particularly important for vegans to focus on due to its lower presence in plant proteins?",
      "choices": ["Leucine", "Lysine", "Valine", "Threonine"],
      "correct_answer_index": 1,
      "explanation": "Lysine is an essential amino acid that vegans need to pay special attention to, as it's less abundant in plant proteins. Good vegan sources include avocados and legumes.",
      "image": "lysine_sources.jpg",
      "difficulty": "hard",
      "category": "nutrition"
    },
    {
      "question_text": "What nutrient, important for bone health, requires careful planning in a vegan diet?",
      "choices": ["Potassium", "Magnesium", "Calcium", "Sodium"],
      "correct_answer_index": 2,
      "explanation": "Calcium is crucial for bone health and requires careful planning in a vegan diet. Good sources include fortified plant milks and dark green leafy vegetables.",
      "image": "vegan_calcium_sources.jpg",
      "difficulty": "hard",
      "category": "nutrition"
    },
    {
      "question_text": "Which nutrient, important for brain function and heart health, may be challenging to obtain in a vegan diet without supplementation?",
      "choices": ["Omega-3 fatty acids", "Vitamin D", "Zinc", "Iodine"],
      "correct_answer_index": 0,
      "explanation": "Omega-3 fatty acids, particularly EPA and DHA, can be challenging to obtain in a vegan diet. While ALA is found in plant sources, conversion to EPA and DHA is limited, making supplementation often necessary.",
      "image": "omega3_sources.jpg",
      "difficulty": "hard",
      "category": "nutrition"
    },
    {
      "question_text": "What mineral, important for immune function and protein synthesis, may require special attention in a vegan diet?",
      "choices": ["Copper", "Selenium", "Zinc", "Manganese"],
      "correct_answer_index": 2,
      "explanation": "Zinc is important for immune function and protein synthesis. It may require special attention in a vegan diet due to lower bioavailability in plant foods and the presence of absorption inhibitors like phytates.",
      "image": "zinc_sources.jpg",
      "difficulty": "hard",
      "category": "nutrition"
    }
  ]
}



The server will start on `http://127.0.0.1:5000/`.

## Database Schema

The API uses SQLite with the following schema:

### Quiz Table
```sql
CREATE TABLE quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    created_at TEXT NOT NULL
)
```

### Questions Table
```sql
CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    questions_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    choices TEXT NOT NULL,
    correct_answer_index INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz (id)
)
```

## API Endpoints

### Quizzes

#### Get All Quizzes
- **URL**: `/api/quizzes`
- **Method**: `GET`
- **Query Parameters**:
  - `category` (optional): Filter quizzes by category
- **Success Response**:
  - **Code**: 200
  - **Content**: Array of quiz objects

#### Get Quiz by ID
- **URL**: `/api/quizzes/<quiz_id>`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**: Quiz object

#### Create Quiz
- **URL**: `/api/quizzes`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "History Quiz",
    "description": "Test your knowledge of history",
    "image": "history.jpg",
    "category": "history",
    "difficulty": "medium"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: Created quiz object

#### Create Quiz with Questions
- **URL**: `/api/quizzes/with-questions`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "quiz": {
      "name": "History of Veganism",
      "description": "A quiz about veganism history",
      "image": "history_quiz.jpg",
      "category": "history",
      "difficulty": "medium"
    },
    "questions": [
      {
        "question_text": "Who coined the term 'vegan'?",
        "choices": ["Donald Watson", "Peter Singer", "Gary Francione", "Isaac Bashevis Singer"],
        "correct_answer_index": 0,
        "explanation": "Donald Watson coined the term 'vegan' in 1944.",
        "image": "donald_watson.jpg",
        "difficulty": "medium",
        "category": "history"
      },
      // More questions...
    ]
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: Created quiz with all questions

#### Delete Quiz
- **URL**: `/api/quizzes/<quiz_id>`
- **Method**: `DELETE`
- **Success Response**:
  - **Code**: 200
  - **Content**: Success message

### Questions

#### Get Questions for a Quiz
- **URL**: `/api/quizzes/<quiz_id>/questions`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**: Array of question objects

#### Add Questions
- **URL**: `/api/questions`
- **Method**: `POST`
- **Body**:
  ```json
  [
    {
      "quiz_id": 1,
      "question_text": "What is the capital of France?",
      "choices": ["London", "Berlin", "Paris", "Madrid"],
      "correct_answer_index": 2,
      "explanation": "Paris is the capital of France.",
      "category": "geography",
      "difficulty": "easy",
      "image": "paris.jpg"
    },
    // More questions...
  ]
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**: Array of created question objects

#### Delete Question
- **URL**: `/api/questions/<question_id>`
- **Method**: `DELETE`
- **Success Response**:
  - **Code**: 200
  - **Content**: Success message

### Categories

#### Get All Categories
- **URL**: `/api/categories`
- **Method**: `GET`
- **Success Response**:
  - **Code**: 200
  - **Content**: Array of category strings

## Request/Response Examples

### Example: Creating a Quiz with Questions

**Request:**
```http
POST /api/quizzes/with-questions
Content-Type: application/json

{
  "quiz": {
    "name": "Science Quiz",
    "description": "Test your knowledge of basic science",
    "image": "science.jpg",
    "category": "science",
    "difficulty": "medium"
  },
  "questions": [
    {
      "question_text": "What is the chemical symbol for water?",
      "choices": ["H2O", "CO2", "NaCl", "O2"],
      "correct_answer_index": 0,
      "explanation": "H2O is the chemical formula for water.",
      "image": "water.jpg",
      "difficulty": "easy",
      "category": "science"
    },
    {
      "question_text": "What is the closest planet to the Sun?",
      "choices": ["Venus", "Earth", "Mercury", "Mars"],
      "correct_answer_index": 2,
      "explanation": "Mercury is the closest planet to the Sun.",
      "image": "mercury.jpg",
      "difficulty": "medium",
      "category": "science"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "quiz": {
    "id": 1,
    "name": "Science Quiz",
    "description": "Test your knowledge of basic science",
    "image": "science.jpg",
    "category": "science",
    "difficulty": "medium",
    "created_at": "2023-06-15"
  },
  "questions": [
    {
      "id": 1,
      "quiz_id": 1,
      "questions_id": "SCIENCE_QUIZ_QUESTIONS",
      "question_text": "What is the chemical symbol for water?",
      "choices": ["H2O", "CO2", "NaCl", "O2"],
      "correct_answer_index": 0,
      "explanation": "H2O is the chemical formula for water.",
      "image": "water.jpg",
      "difficulty": "easy",
      "category": "science"
    },
    {
      "id": 2,
      "quiz_id": 1,
      "questions_id": "SCIENCE_QUIZ_QUESTIONS",
      "question_text": "What is the closest planet to the Sun?",
      "choices": ["Venus", "Earth", "Mercury", "Mars"],
      "correct_answer_index": 2,
      "explanation": "Mercury is the closest planet to the Sun.",
      "image": "mercury.jpg",
      "difficulty": "medium",
      "category": "science"
    }
  ],
  "total_questions": 2
}
```

### Example: Getting Quizzes by Category

**Request:**
```http
GET /api/quizzes?category=history
```

**Response:**
```json
[
  {
    "id": 2,
    "name": "History of Veganism",
    "description": "A quiz about veganism history",
    "image": "history_quiz.jpg",
    "category": "history",
    "difficulty": "medium",
    "created_at": "2023-06-15"
  },
  {
    "id": 3,
    "name": "Ancient Civilizations",
    "description": "Test your knowledge of ancient civilizations",
    "image": "ancient.jpg",
    "category": "history",
    "difficulty": "hard",
    "created_at": "2023-06-16"
  }
]
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

Error responses include a JSON object with an error message:

```json
{
  "error": "Quiz with ID 999 not found"
}
```

For more complex errors, additional details may be provided:

```json
{
  "success": false,
  "error": "Database error",
  "details": "..."
}
```