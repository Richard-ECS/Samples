def calculate_course_metrics(course_modules: list) -> dict:
    """
    Calculate course metrics such as total duration and difficulty level
    
    Args:
        course_modules (list): List of dictionaries containing module information
        
    Returns:
        dict: Dictionary containing calculated metrics
    """
    total_duration = 0
    difficulty_scores = []
    total_exercises = 0
    
    # Loop through modules to calculate metrics
    for module in course_modules:
        # Add duration (conditional logic with ternary operator)
        total_duration += module.get('duration', 0)
        
        # Track difficulty (using list operations)
        difficulty_scores.append(module['difficulty'])
        
        # Count exercises (conditional logic with if statement)
        if 'exercises' in module:
            total_exercises += len(module['exercises'])
    
    # Calculate average difficulty (array/list operation with conditional)
    avg_difficulty = sum(difficulty_scores) / len(difficulty_scores) if difficulty_scores else 0
    
    return {
        'total_duration': total_duration,
        'average_difficulty': round(avg_difficulty, 2),
        'total_exercises': total_exercises
    }

def organize_modules(modules: list, sort_by: str = 'order') -> list:
    """
    Organize course modules based on specified criteria
    
    Args:
        modules (list): List of module dictionaries
        sort_by (str): Criteria to sort by ('order', 'difficulty', or 'duration')
        
    Returns:
        list: Sorted list of modules
    """
    # Conditional logic to determine sorting key
    if sort_by == 'difficulty':
        return sorted(modules, key=lambda x: x['difficulty'])
    elif sort_by == 'duration':
        return sorted(modules, key=lambda x: x['duration'])
    else:
        return sorted(modules, key=lambda x: x['order'])

def validate_course_structure(modules: list) -> list:
    """
    Validate course structure and return any warnings
    
    Args:
        modules (list): List of module dictionaries
        
    Returns:
        list: List of warning messages
    """
    warnings = []
    
    # Loop through modules to check for issues
    for i, module in enumerate(modules):
        # Check for required fields (conditional logic)
        if 'title' not in module:
            warnings.append(f"Module {i+1} missing title")
        
        # Validate duration (conditional logic)
        if module.get('duration', 0) > 120:
            warnings.append(f"Module '{module.get('title', f'Module {i+1}')}' duration exceeds 2 hours")
        
        # Validate exercise count (conditional with loop counting)
        if 'exercises' in module and len(module['exercises']) < 2:
            warnings.append(f"Module '{module.get('title', f'Module {i+1}')}' has insufficient exercises")
    
    return warnings

def main():
    """Example usage of the course management system"""
    
    # Example course modules (array/list of dictionaries)
    course_modules = [
        {
            'title': 'Introduction to Python',
            'order': 1,
            'duration': 60,
            'difficulty': 3,
            'exercises': ['Hello World', 'Basic Calculations']
        },
        {
            'title': 'Control Flow',
            'order': 2,
            'duration': 90,
            'difficulty': 4,
            'exercises': ['If Statements', 'Loops', 'Function Practice']
        },
        {
            'title': 'Data Structures',
            'order': 3,
            'duration': 120,
            'difficulty': 4,
            'exercises': ['Lists', 'Dictionaries']
        }
    ]
    
    # Calculate metrics
    metrics = calculate_course_metrics(course_modules)
    print("\nCourse Metrics:")
    print(f"Total Duration: {metrics['total_duration']} minutes")
    print(f"Average Difficulty: {metrics['average_difficulty']}/5")
    print(f"Total Exercises: {metrics['total_exercises']}")
    
    # Organize modules by different criteria
    print("\nModules by Difficulty:")
    for module in organize_modules(course_modules, 'difficulty'):
        print(f"- {module['title']} (Difficulty: {module['difficulty']})")
    
    # Validate course structure
    warnings = validate_course_structure(course_modules)
    if warnings:
        print("\nStructure Warnings:")
        for warning in warnings:
            print(f"- {warning}")
    else:
        print("\nNo structure warnings found.")

if __name__ == "__main__":
    main()
