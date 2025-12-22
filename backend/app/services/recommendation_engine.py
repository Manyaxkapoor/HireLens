from typing import Dict, List


# Rule-based recommendations for common skills
SKILL_RECOMMENDATIONS = {
    "python": {
        "projects": [
            "Build a REST API using FastAPI and SQLAlchemy",
            "Create a data analysis script with pandas and matplotlib",
            "Develop a web scraper using BeautifulSoup and requests"
        ],
        "learning_resources": [
            "Complete Python tutorials on freeCodeCamp or Codecademy",
            "Read 'Automate the Boring Stuff with Python' book"
        ],
        "resume_tips": [
            "Add a 'Technical Skills' section highlighting Python proficiency",
            "Include specific Python libraries you've used (e.g., Django, Flask, pandas)"
        ]
    },
    "javascript": {
        "projects": [
            "Build an interactive web application with vanilla JavaScript",
            "Create a Node.js backend API",
            "Develop a Chrome extension"
        ],
        "learning_resources": [
            "Complete JavaScript courses on MDN Web Docs",
            "Practice on freeCodeCamp JavaScript curriculum"
        ],
        "resume_tips": [
            "List JavaScript frameworks you've worked with",
            "Mention ES6+ features and asynchronous programming"
        ]
    },
    "react": {
        "projects": [
            "Build a task management app with React and Redux",
            "Create a responsive portfolio website with React Router",
            "Develop a real-time chat application with React and Socket.io"
        ],
        "learning_resources": [
            "Complete the official React documentation tutorial",
            "Take React courses on Udemy or Coursera"
        ],
        "resume_tips": [
            "Highlight React hooks and component lifecycle knowledge",
            "Mention state management libraries (Redux, Context API)"
        ]
    },
    "sql": {
        "projects": [
            "Design and implement a database schema for an e-commerce site",
            "Create complex queries for data analysis",
            "Build a reporting dashboard with SQL and visualization tools"
        ],
        "learning_resources": [
            "Practice SQL on LeetCode or HackerRank",
            "Study database design principles"
        ],
        "resume_tips": [
            "Specify database systems you've worked with (PostgreSQL, MySQL)",
            "Include examples of complex queries or optimizations"
        ]
    },
    "api": {
        "projects": [
            "Build a RESTful API with proper HTTP methods and status codes",
            "Create API documentation using Swagger/OpenAPI",
            "Implement authentication and authorization in an API"
        ],
        "learning_resources": [
            "Study REST API design principles",
            "Learn about GraphQL as an alternative to REST"
        ],
        "resume_tips": [
            "Describe API endpoints you've designed or consumed",
            "Mention API testing tools (Postman, Insomnia)"
        ]
    },
    "database": {
        "projects": [
            "Design a normalized database schema",
            "Implement database indexing and query optimization",
            "Set up database replication or backup strategies"
        ],
        "learning_resources": [
            "Learn about ACID properties and database transactions",
            "Study different database types (SQL vs NoSQL)"
        ],
        "resume_tips": [
            "List specific databases and ORMs you've used",
            "Include database design or optimization achievements"
        ]
    },
    "git": {
        "projects": [
            "Set up a Git workflow for a team project",
            "Create a GitHub repository with proper documentation",
            "Implement Git hooks for code quality checks"
        ],
        "learning_resources": [
            "Complete Git tutorials on Atlassian or GitHub",
            "Learn branching strategies (Git Flow, GitHub Flow)"
        ],
        "resume_tips": [
            "Mention version control experience and collaboration tools",
            "Include examples of pull requests or code reviews"
        ]
    },
    "docker": {
        "projects": [
            "Containerize a multi-service application",
            "Create Docker Compose files for development environment",
            "Set up CI/CD pipeline with Docker"
        ],
        "learning_resources": [
            "Complete Docker courses on Docker's official documentation",
            "Practice with Docker playground environments"
        ],
        "resume_tips": [
            "Describe containerization experience and orchestration tools",
            "Mention Docker best practices you've implemented"
        ]
    },
    "testing": {
        "projects": [
            "Write comprehensive unit tests for an existing codebase",
            "Implement integration tests for API endpoints",
            "Set up automated testing pipeline"
        ],
        "learning_resources": [
            "Learn TDD (Test-Driven Development) principles",
            "Study testing frameworks for your tech stack"
        ],
        "resume_tips": [
            "Quantify testing coverage and bug reduction achievements",
            "List testing tools and methodologies you've used"
        ]
    }
}


def generate_recommendations(missing_skills: List[str], role: str = "backend developer") -> Dict:
    """
    Generate rule-based recommendations for missing skills.

    Args:
        missing_skills: List of skills identified as missing
        role: Job role for contextual recommendations

    Returns:
        Dictionary with projects, learning resources, and resume tips
    """
    recommendations = {
        "projects": [],
        "learning_resources": [],
        "resume_improvements": [],
        "skill_priority": []
    }

    # Process each missing skill
    for skill in missing_skills[:10]:  # Limit to top 10 to avoid overwhelming
        skill_lower = skill.lower()

        if skill_lower in SKILL_RECOMMENDATIONS:
            rec = SKILL_RECOMMENDATIONS[skill_lower]

            # Add projects (limit to 2 per skill)
            recommendations["projects"].extend(rec["projects"][:2])

            # Add learning resources (limit to 1 per skill)
            recommendations["learning_resources"].extend(rec["learning_resources"][:1])

            # Add resume tips
            recommendations["resume_improvements"].extend(rec["resume_tips"])

            # Add to priority list
            recommendations["skill_priority"].append({
                "skill": skill,
                "priority": "high" if skill_lower in ["python", "javascript", "sql"] else "medium",
                "reason": f"Critical for {role} roles"
            })

    # Remove duplicates while preserving order
    for key in ["projects", "learning_resources", "resume_improvements"]:
        recommendations[key] = list(dict.fromkeys(recommendations[key]))

    # Limit total recommendations
    recommendations["projects"] = recommendations["projects"][:5]
    recommendations["learning_resources"] = recommendations["learning_resources"][:5]
    recommendations["resume_improvements"] = recommendations["resume_improvements"][:5]

    return recommendations