const data = {
    '1,2': [5, 4, 2],
    '3,5': [10, 15, 20],
    '4,6': [25, 30, 35],
};

const allInterests = Array.from({ length: 10 }, (_, i) => i + 1); // Interests are [1, 2, ..., 10]

// Convert interest array to binary vector
function interestToVector(interestArray, allInterests) {
    return allInterests.map(interest => interestArray.includes(interest) ? 1 : 0);
}

// Calculate Jaccard similarity
function calculateSimilarity(userVector, otherVector) {
    const intersection = userVector.reduce((acc, val, i) => acc + (val && otherVector[i]), 0);
    const union = userVector.reduce((acc, val, i) => acc + (val || otherVector[i]), 0);
    return union === 0 ? 0 : intersection / union;
}

// Recommend courses based on collaborative filtering
function recommendCourses(selectedInterests, data, allInterests, topN = 15) {
    const selectedVector = interestToVector(selectedInterests, allInterests);
    const similarityScores = [];

    // Compute similarity with other users
    for (const [interestString, courses] of Object.entries(data)) {
        const interestArray = interestString.split(',').map(Number);
        const otherVector = interestToVector(interestArray, allInterests);
        const similarity = calculateSimilarity(selectedVector, otherVector);
        similarityScores.push({ similarity, courses });
    }

    // Sort by similarity scores in descending order
    similarityScores.sort((a, b) => b.similarity - a.similarity);

    // Collect recommended courses
    const recommendedCourses = {};
    for (const { similarity, courses } of similarityScores) {
        courses.forEach(course => {
            recommendedCourses[course] = (recommendedCourses[course] || 0) + similarity;
        });
    }

    // Sort recommended courses by their similarity score
    const sortedRecommendations = Object.entries(recommendedCourses)
        .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
        .map(([course]) => Number(course));

    // Return the top N courses
    return sortedRecommendations.slice(0, topN);
}

// Example usage: Recommend courses for user with interests [1, 2]
const userSelectedInterests = [8,9];
const recommendedCourses = recommendCourses(userSelectedInterests, data, allInterests);
console.log("Recommended Courses:", recommendedCourses);