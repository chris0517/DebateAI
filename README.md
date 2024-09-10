[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=13372103)

# DebateAI

## Overview
DebateAI is an ed-tech platform that allows students to pick topics to debate on, pick a side to be on, and have a well-structured debate with the AI. In the debate, the AI will look for claims that rebut their position, specific evidence, and analysis/reasoning to proceed.  After the debate, the AI provides feedback to the student, one or two things they did the best, and a suggestion for improvement. 


1. **Browsing Debate Topics**: Users can browse through a list of debate topics stored in a MySQL database. Each topic includes a title, description, and icon. The application successfully retrieves and displays these details. 

2. **Debate Bot**: Users can engage in debates and discussions by clicking on any of the topics on the landing page. This action directs them to a chat page where they can interact with a trained AI that prompts them with the selected topic.

3. **Sign Up, Sign In using Gmail**: The application allows users to sign up easily using their Gmail accounts. It integrates with Google's endpoint for authentication. Upon successful authentication, the user's credentials are decoded and essential information such as name, email address, role (student or teacher), and student number (if applicable) are sent to the MySQL database. 





## To run this app:

- The app starts automatically in dev mode when you open this project in Codespaces. You can stop it by pressing Ctrl+C in the Codespaces terminal, where the app is running. To restart, use the following command from the main project directory:

```
yarn dev
```
<!-- 
- make sure you modify `config.js` to point to your MySQL database. The MySQL server name is


```
ec2-3-137-65-169.us-east-2.compute.amazonaws.com
```
The database name is the same as your UW username.
-->

## Development Tips:

- Use CodeSpaces for this project.
- In VSCode terminal on CodeSpaces start a new branch:

```
git checkout -b your-branch-name
```

- As you code, push daily changes to your GitHub repo's `your-branch-name` branch:

```
git add .
git commit -m "done feature xyz"
git push origin your-branch-name
```

For this project, you will be required to develop a full-stack React/NodeJS application with a MySQL database. To develop the MySQL database, follow the same process as in MSci 245:

1. Open MySQL Workbench on your local machine and connect to
<!-- 
```
ec2-3-137-65-169.us-east-2.compute.amazonaws.com
```
-->

with your username

2. Once you are connected, open a Query window and select your database:

```
USE YourUserName;
```

where YourUserName is the same as in Step 1.

3. List all the tables visible to you.

```
SHOW TABLES;
```

Tip: Click on the icon highlighted in the figure below to only run the query with the cursor.

![image](/img/screen1.png)

4. You will see the list of tables that are currently in your database.

5. Create new tables required for your project task.

6. Write the React/NodeJS code required for your project task.

7. After you finish your development task, make sure that the app renders in the browser and functions according to the specifications.

8. Push changes to the GitHub:

```
git add .
git commit -m "meaningful message indicating what changes were made"
git push origin your-branch-name
```

9. In your GitHub repo, create new pull request. Ensure that other team members review and approve the changes. After that, merge `your-branch-name` branch with the `main` branch.
