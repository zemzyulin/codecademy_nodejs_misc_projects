// Mini-project: random workout generator

let workout = () => {
    const exerciseList = ['Squats', 'Leg press', 'Lunge', 'Deadlift', 'Bench press', 'Push-ups', 'Pull-ups', 'Biceps curl'];
    const exerciseDuration = Math.round((Math.floor(Math.random() * 61) + 30) / 10) * 10;
    const inspirationList = ['Sweat is just fat!', 'Later = Never. Do it now!', 'The body achieves what the mid believes!',
                            'Tough times don\'t last. Tough people do!', 'Once you learn to quit, it becomes a habit.'];
    return console.log(`Your exercise today: ${exerciseList[Math.floor(Math.random() * 8)]}\nDuration: ${exerciseDuration} seconds\n${inspirationList[Math.floor(Math.random() * 5)]} \nGO!`);         
}
workout();
