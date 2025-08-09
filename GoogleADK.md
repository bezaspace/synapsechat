Directory structure:
└── get-started/
    ├── about.md
    ├── index.md
    ├── installation.md
    ├── quickstart.md
    ├── testing.md
    └── streaming/
        ├── index.md
        ├── quickstart-streaming-java.md
        └── quickstart-streaming.md

================================================
FILE: docs/get-started/about.md
================================================
# Agent Development Kit (ADK)

<p style="text-align:center;"> <b> Build, Evaluate and Deploy agents, seamlessly! </b> </p>

ADK is designed to empower developers
to build, manage, evaluate and deploy AI-powered agents. It provides a robust
and flexible environment for creating both conversational and non-conversational
agents, capable of handling complex tasks and workflows.

![intro_components.png](../assets/adk-components.png)

## Core Concepts

ADK is built around a few key primitives and concepts that make it
powerful and flexible. Here are the essentials:

* **Agent:** The fundamental worker unit designed for specific tasks. Agents can
  use language models (`LlmAgent`) for complex reasoning, or act as deterministic controllers of the execution, which are called "[workflow agents](../agents/workflow-agents/index.md)" (`SequentialAgent`, `ParallelAgent`, `LoopAgent`).
* **Tool:** Gives agents abilities beyond conversation, letting them interact
  with external APIs, search information, run code, or call other services.
* **Callbacks:** Custom code snippets you provide to run at specific points in
  the agent's process, allowing for checks, logging, or behavior modifications.
* **Session Management (`Session` & `State`):** Handles the context of a single
  conversation (`Session`), including its history (`Events`) and the agent's
  working memory for that conversation (`State`).
* **Memory:** Enables agents to recall information about a user across
  *multiple* sessions, providing long-term context (distinct from short-term
  session `State`).
* **Artifact Management (`Artifact`):** Allows agents to save, load, and manage
  files or binary data (like images, PDFs) associated with a session or user.
* **Code Execution:** The ability for agents (usually via Tools) to generate and
  execute code to perform complex calculations or actions.
* **Planning:** An advanced capability where agents can break down complex goals
  into smaller steps and plan how to achieve them like a ReAct planner.
* **Models:** The underlying LLM that powers `LlmAgent`s, enabling their
  reasoning and language understanding abilities.
* **Event:** The basic unit of communication representing things that happen
  during a session (user message, agent reply, tool use), forming the
  conversation history.
* **Runner:** The engine that manages the execution flow, orchestrates agent
  interactions based on Events, and coordinates with backend services.

***Note:** Features like Multimodal Streaming, Evaluation, Deployment,
Debugging, and Trace are also part of the broader ADK ecosystem, supporting
real-time interaction and the development lifecycle.*

## Key Capabilities

ADK offers several key advantages for developers building
agentic applications:

1. **Multi-Agent System Design:** Easily build applications composed of
   multiple, specialized agents arranged hierarchically. Agents can coordinate
   complex tasks, delegate sub-tasks using LLM-driven transfer or explicit
   `AgentTool` invocation, enabling modular and scalable solutions.
2. **Rich Tool Ecosystem:** Equip agents with diverse capabilities. ADK
   supports integrating custom functions (`FunctionTool`), using other agents as
   tools (`AgentTool`), leveraging built-in functionalities like code execution,
   and interacting with external data sources and APIs (e.g., Search,
   Databases). Support for long-running tools allows handling asynchronous
   operations effectively.
3. **Flexible Orchestration:** Define complex agent workflows using built-in
   workflow agents (`SequentialAgent`, `ParallelAgent`, `LoopAgent`) alongside
   LLM-driven dynamic routing. This allows for both predictable pipelines and
   adaptive agent behavior.
4. **Integrated Developer Tooling:** Develop and iterate locally with ease.
   ADK includes tools like a command-line interface (CLI) and a Developer
   UI for running agents, inspecting execution steps (events, state changes),
   debugging interactions, and visualizing agent definitions.
5. **Native Streaming Support:** Build real-time, interactive experiences with
   native support for bidirectional streaming (text and audio). This integrates
   seamlessly with underlying capabilities like the
   [Multimodal Live API for the Gemini Developer API](https://ai.google.dev/gemini-api/docs/live)
   (or for
   [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/multimodal-live)),
   often enabled with simple configuration changes.
6. **Built-in Agent Evaluation:** Assess agent performance systematically. The
   framework includes tools to create multi-turn evaluation datasets and run
   evaluations locally (via CLI or the dev UI) to measure quality and
   guide improvements.
7. **Broad LLM Support:** While optimized for Google's Gemini models, the
   framework is designed for flexibility, allowing integration with various LLMs
   (potentially including open-source or fine-tuned models) through its
   `BaseLlm` interface.
8. **Artifact Management:** Enable agents to handle files and binary data. The
   framework provides mechanisms (`ArtifactService`, context methods) for agents
   to save, load, and manage versioned artifacts like images, documents, or
   generated reports during their execution.
9. **Extensibility and Interoperability:** ADK promotes an open
   ecosystem. While providing core tools, it allows developers to easily
   integrate and reuse tools from other popular agent frameworks including
   LangChain and CrewAI.
10. **State and Memory Management:** Automatically handles short-term
    conversational memory (`State` within a `Session`) managed by the
    `SessionService`. Provides integration points for longer-term `Memory`
    services, allowing agents to recall user information across multiple
    sessions.

![intro_components.png](../assets/adk-lifecycle.png)

## Get Started

* Ready to build your first agent? [Try the quickstart](./quickstart.md)



================================================
FILE: docs/get-started/index.md
================================================
# Get Started

Agent Development Kit (ADK) is designed to empower developers
to build, manage, evaluate and deploy AI-powered agents. It provides a robust
and flexible environment for creating both conversational and non-conversational
agents, capable of handling complex tasks and workflows.

<div class="grid cards" markdown>

-   :material-console-line: **Installation**

    ---

    Install `google-adk` for Python or Java and get up and running in minutes.

    [:octicons-arrow-right-24: More information](installation.md)

-   :material-console-line: **Quickstart**

    ---

    Create your first ADK agent with tools in minutes.

    [:octicons-arrow-right-24: More information](quickstart.md)

-   :material-console-line: **Quickstart (streaming)**

    ---

    Create your first streaming ADK agent.

    [:octicons-arrow-right-24: More information](streaming/quickstart-streaming.md)

-   :material-console-line: **Tutorial**

    ---

    Create your first ADK multi-agent.

    [:octicons-arrow-right-24: More information](../tutorials/index.md)

-   :material-rocket-launch-outline: **Discover sample agents**

    ---

    Discover sample agents for retail, travel, customer service, and more!

    [:octicons-arrow-right-24: Discover adk-samples](https://github.com/google/adk-samples){:target="_blank"}

-   :material-graph: **About**

    ---

    Learn about the key components of building and deploying ADK agents.

    [:octicons-arrow-right-24: More information](about.md)

</div>



================================================
FILE: docs/get-started/installation.md
================================================
# Installing ADK

=== "Python"

    ## Create & activate virtual environment
    
    We recommend creating a virtual Python environment using
    [venv](https://docs.python.org/3/library/venv.html):
    
    ```shell
    python -m venv .venv
    ```
    
    Now, you can activate the virtual environment using the appropriate command for
    your operating system and environment:
    
    ```
    # Mac / Linux
    source .venv/bin/activate
    
    # Windows CMD:
    .venv\Scripts\activate.bat
    
    # Windows PowerShell:
    .venv\Scripts\Activate.ps1
    ```

    ### Install ADK
    
    ```bash
    pip install google-adk
    ```
    
    (Optional) Verify your installation:
    
    ```bash
    pip show google-adk
    ```

=== "Java"

    You can either use maven or gradle to add the `google-adk` and `google-adk-dev` package.

    `google-adk` is the core Java ADK library. Java ADK also comes with a pluggable example SpringBoot server to run your agents seamlessly. This optional
    package is present as part of `google-adk-dev`.
    
    If you are using maven, add the following to your `pom.xml`:

    ```xml title="pom.xml"
    <dependencies>
      <!-- The ADK Core dependency -->
      <dependency>
        <groupId>com.google.adk</groupId>
        <artifactId>google-adk</artifactId>
        <version>0.1.0</version>
      </dependency>
      
      <!-- The ADK Dev Web UI to debug your agent (Optional) -->
      <dependency>
        <groupId>com.google.adk</groupId>
        <artifactId>google-adk-dev</artifactId>
        <version>0.1.0</version>
      </dependency>
    </dependencies>
    ```

    Here's a [complete pom.xml](https://github.com/google/adk-docs/tree/main/examples/java/cloud-run/pom.xml) file for reference.

    If you are using gradle, add the dependency to your build.gradle:

    ```title="build.gradle"
    dependencies {
        implementation 'com.google.adk:google-adk:0.1.0'
        implementation 'com.google.adk:google-adk-dev:0.1.0'
    }
    ```


## Next steps

* Try creating your first agent with the [**Quickstart**](quickstart.md)



================================================
FILE: docs/get-started/quickstart.md
================================================
# Quickstart

This quickstart guides you through installing the Agent Development Kit (ADK),
setting up a basic agent with multiple tools, and running it locally either in the terminal or in the interactive, browser-based dev UI.

<!-- <img src="../../assets/quickstart.png" alt="Quickstart setup"> -->

This quickstart assumes a local IDE (VS Code, PyCharm, IntelliJ IDEA, etc.)
with Python 3.9+ or Java 17+ and terminal access. This method runs the
application entirely on your machine and is recommended for internal development.

## 1. Set up Environment & Install ADK {#venv-install}

=== "Python"

    Create & Activate Virtual Environment (Recommended):

    ```bash
    # Create
    python -m venv .venv
    # Activate (each new terminal)
    # macOS/Linux: source .venv/bin/activate
    # Windows CMD: .venv\Scripts\activate.bat
    # Windows PowerShell: .venv\Scripts\Activate.ps1
    ```

    Install ADK:

    ```bash
    pip install google-adk
    ```

=== "Java"

    To install ADK and setup the environment, proceed to the following steps.

## 2. Create Agent Project {#create-agent-project}

### Project structure

=== "Python"

    You will need to create the following project structure:

    ```console
    parent_folder/
        multi_tool_agent/
            __init__.py
            agent.py
            .env
    ```

    Create the folder `multi_tool_agent`:

    ```bash
    mkdir multi_tool_agent/
    ```

    !!! info "Note for Windows users"

        When using ADK on Windows for the next few steps, we recommend creating
        Python files using File Explorer or an IDE because the following commands
        (`mkdir`, `echo`) typically generate files with null bytes and/or incorrect
        encoding.

    ### `__init__.py`

    Now create an `__init__.py` file in the folder:

    ```shell
    echo "from . import agent" > multi_tool_agent/__init__.py
    ```

    Your `__init__.py` should now look like this:

    ```python title="multi_tool_agent/__init__.py"
    --8<-- "examples/python/snippets/get-started/multi_tool_agent/__init__.py"
    ```

    ### `agent.py`

    Create an `agent.py` file in the same folder:

    ```shell
    touch multi_tool_agent/agent.py
    ```

    Copy and paste the following code into `agent.py`:

    ```python title="multi_tool_agent/agent.py"
    --8<-- "examples/python/snippets/get-started/multi_tool_agent/agent.py"
    ```

    ### `.env`

    Create a `.env` file in the same folder:

    ```shell
    touch multi_tool_agent/.env
    ```

    More instructions about this file are described in the next section on [Set up the model](#set-up-the-model).

=== "Java"

    Java projects generally feature the following project structure:

    ```console
    project_folder/
    ├── pom.xml (or build.gradle)
    ├── src/
    ├── └── main/
    │       └── java/
    │           └── agents/
    │               └── multitool/
    └── test/
    ```

    ### Create `MultiToolAgent.java`

    Create a `MultiToolAgent.java` source file in the `agents.multitool` package
    in the `src/main/java/agents/multitool/` directory.

    Copy and paste the following code into `MultiToolAgent.java`:

    ```java title="agents/multitool/MultiToolAgent.java"
    --8<-- "examples/java/cloud-run/src/main/java/agents/multitool/MultiToolAgent.java:full_code"
    ```

![intro_components.png](../assets/quickstart-flow-tool.png)

## 3. Set up the model {#set-up-the-model}

Your agent's ability to understand user requests and generate responses is
powered by a Large Language Model (LLM). Your agent needs to make secure calls
to this external LLM service, which requires authentication credentials. Without
valid authentication, the LLM service will deny the agent's requests, and the
agent will be unable to function.

=== "Gemini - Google AI Studio"
    1. Get an API key from [Google AI Studio](https://aistudio.google.com/apikey).
    2. When using Python, open the **`.env`** file located inside (`multi_tool_agent/`)
    and copy-paste the following code.

        ```env title="multi_tool_agent/.env"
        GOOGLE_GENAI_USE_VERTEXAI=FALSE
        GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_API_KEY_HERE
        ```

        When using Java, define environment variables:

        ```console title="terminal"
        export GOOGLE_GENAI_USE_VERTEXAI=FALSE
        export GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_API_KEY_HERE
        ```

    3. Replace `PASTE_YOUR_ACTUAL_API_KEY_HERE` with your actual `API KEY`.

=== "Gemini - Google Cloud Vertex AI"
    1. You need an existing
    [Google Cloud](https://cloud.google.com/?e=48754805&hl=en) account and a
    project.
        * Set up a
          [Google Cloud project](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#setup-gcp)
        * Set up the
          [gcloud CLI](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#setup-local)
        * Authenticate to Google Cloud, from the terminal by running
          `gcloud auth login`.
        * [Enable the Vertex AI API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com).
    2. When using Python, open the **`.env`** file located inside (`multi_tool_agent/`). Copy-paste
    the following code and update the project ID and location.

        ```env title="multi_tool_agent/.env"
        GOOGLE_GENAI_USE_VERTEXAI=TRUE
        GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID
        GOOGLE_CLOUD_LOCATION=LOCATION
        ```

        When using Java, define environment variables:

        ```console title="terminal"
        export GOOGLE_GENAI_USE_VERTEXAI=TRUE
        export GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID
        export GOOGLE_CLOUD_LOCATION=LOCATION
        ```

=== "Gemini - Google Cloud Vertex AI with Express Mode"
    1. You can sign up for a free Google Cloud project and use Gemini for free with an eligible account!
        * Set up a
          [Google Cloud project with Vertex AI Express Mode](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview)
        * Get an API key from your Express mode project. This key can be used with ADK to use Gemini models for free, as well as access to Agent Engine services.
    2. When using Python, open the **`.env`** file located inside (`multi_tool_agent/`). Copy-paste
    the following code and update the project ID and location.

        ```env title="multi_tool_agent/.env"
        GOOGLE_GENAI_USE_VERTEXAI=TRUE
        GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_EXPRESS_MODE_API_KEY_HERE
        ```

        When using Java, define environment variables:

        ```console title="terminal"
        export GOOGLE_GENAI_USE_VERTEXAI=TRUE
        export GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_EXPRESS_MODE_API_KEY_HERE
        ```

## 4. Run Your Agent {#run-your-agent}

=== "Python"

    Using the terminal, navigate to the parent directory of your agent project
    (e.g. using `cd ..`):

    ```console
    parent_folder/      <-- navigate to this directory
        multi_tool_agent/
            __init__.py
            agent.py
            .env
    ```

    There are multiple ways to interact with your agent:

    === "Dev UI (adk web)"
        Run the following command to launch the **dev UI**.

        ```shell
        adk web
        ```
        
        !!!info "Note for Windows users"

            When hitting the `_make_subprocess_transport NotImplementedError`, consider using `adk web --no-reload` instead.


        **Step 1:** Open the URL provided (usually `http://localhost:8000` or
        `http://127.0.0.1:8000`) directly in your browser.

        **Step 2.** In the top-left corner of the UI, you can select your agent in
        the dropdown. Select "multi_tool_agent".

        !!!note "Troubleshooting"

            If you do not see "multi_tool_agent" in the dropdown menu, make sure you
            are running `adk web` in the **parent folder** of your agent folder
            (i.e. the parent folder of multi_tool_agent).

        **Step 3.** Now you can chat with your agent using the textbox:

        ![adk-web-dev-ui-chat.png](../assets/adk-web-dev-ui-chat.png)


        **Step 4.**  By using the `Events` tab at the left, you can inspect
        individual function calls, responses and model responses by clicking on the
        actions:

        ![adk-web-dev-ui-function-call.png](../assets/adk-web-dev-ui-function-call.png)

        On the `Events` tab, you can also click the `Trace` button to see the trace logs for each event that shows the latency of each function calls:

        ![adk-web-dev-ui-trace.png](../assets/adk-web-dev-ui-trace.png)

        **Step 5.** You can also enable your microphone and talk to your agent:

        !!!note "Model support for voice/video streaming"

            In order to use voice/video streaming in ADK, you will need to use Gemini models that support the Live API. You can find the **model ID(s)** that supports the Gemini Live API in the documentation:

            - [Google AI Studio: Gemini Live API](https://ai.google.dev/gemini-api/docs/models#live-api)
            - [Vertex AI: Gemini Live API](https://cloud.google.com/vertex-ai/generative-ai/docs/live-api)

            You can then replace the `model` string in `root_agent` in the `agent.py` file you created earlier ([jump to section](#agentpy)). Your code should look something like:

            ```py
            root_agent = Agent(
                name="weather_time_agent",
                model="replace-me-with-model-id", #e.g. gemini-2.0-flash-live-001
                ...
            ```

        ![adk-web-dev-ui-audio.png](../assets/adk-web-dev-ui-audio.png)

    === "Terminal (adk run)"

        Run the following command, to chat with your Weather agent.

        ```
        adk run multi_tool_agent
        ```

        ![adk-run.png](../assets/adk-run.png)

        To exit, use Cmd/Ctrl+C.

    === "API Server (adk api_server)"

        `adk api_server` enables you to create a local FastAPI server in a single
        command, enabling you to test local cURL requests before you deploy your
        agent.

        ![adk-api-server.png](../assets/adk-api-server.png)

        To learn how to use `adk api_server` for testing, refer to the
        [documentation on testing](testing.md).

=== "Java"

    Using the terminal, navigate to the parent directory of your agent project
    (e.g. using `cd ..`):

    ```console
    project_folder/                <-- navigate to this directory
    ├── pom.xml (or build.gradle)
    ├── src/
    ├── └── main/
    │       └── java/
    │           └── agents/
    │               └── multitool/
    │                   └── MultiToolAgent.java
    └── test/
    ```

    === "Dev UI"

        Run the following command from the terminal to launch the Dev UI.

        **DO NOT change the main class name of the Dev UI server.**

        ```console title="terminal"
        mvn exec:java \
            -Dexec.mainClass="com.google.adk.web.AdkWebServer" \
            -Dexec.args="--adk.agents.source-dir=src/main/java" \
            -Dexec.classpathScope="compile"
        ```

        **Step 1:** Open the URL provided (usually `http://localhost:8080` or
        `http://127.0.0.1:8080`) directly in your browser.

        **Step 2.** In the top-left corner of the UI, you can select your agent in
        the dropdown. Select "multi_tool_agent".

        !!!note "Troubleshooting"

            If you do not see "multi_tool_agent" in the dropdown menu, make sure you
            are running the `mvn` command at the location where your Java source code
            is located (usually `src/main/java`).

        **Step 3.** Now you can chat with your agent using the textbox:

        ![adk-web-dev-ui-chat.png](../assets/adk-web-dev-ui-chat.png)

        **Step 4.** You can also inspect individual function calls, responses and
        model responses by clicking on the actions:

        ![adk-web-dev-ui-function-call.png](../assets/adk-web-dev-ui-function-call.png)

    === "Maven"

        With Maven, run the `main()` method of your Java class
        with the following command:

        ```console title="terminal"
        mvn compile exec:java -Dexec.mainClass="agents.multitool.MultiToolAgent"
        ```

    === "Gradle"

        With Gradle, the `build.gradle` or `build.gradle.kts` build file
        should have the following Java plugin in its `plugins` section:

        ```groovy
        plugins {
            id("java")
            // other plugins
        }
        ```

        Then, elsewhere in the build file, at the top-level,
        create a new task to run the `main()` method of your agent:

        ```groovy
        task runAgent(type: JavaExec) {
            classpath = sourceSets.main.runtimeClasspath
            mainClass = "agents.multitool.MultiToolAgent"
        }
        ```

        Finally, on the command-line, run the following command:

        ```console
        gradle runAgent
        ```



### 📝 Example prompts to try

* What is the weather in New York?
* What is the time in New York?
* What is the weather in Paris?
* What is the time in Paris?

## 🎉 Congratulations!

You've successfully created and interacted with your first agent using ADK!

---

## 🛣️ Next steps

* **Go to the tutorial**: Learn how to add memory, session, state to your agent:
  [tutorial](../tutorials/index.md).
* **Delve into advanced configuration:** Explore the [setup](installation.md)
  section for deeper dives into project structure, configuration, and other
  interfaces.
* **Understand Core Concepts:** Learn about
  [agents concepts](../agents/index.md).



================================================
FILE: docs/get-started/testing.md
================================================
# Testing your Agents

Before you deploy your agent, you should test it to ensure that it is working as
intended. The easiest way to test your agent in your development environment is
to use the ADK web UI with the following commands. 

=== "Python"

    ```py
    adk api_server
    ```

=== "Java"

    Make sure to update the port number.

    ```java
    mvn compile exec:java \
         -Dexec.args="--adk.agents.source-dir=src/main/java/agents --server.port=8080"
    ```
    In Java, both the Dev UI and the API server are bundled together.

This command will launch a local web
server, where you can run cURL commands or send API requests to test your agent.

## Local testing

Local testing involves launching a local web server, creating a session, and
sending queries to your agent. First, ensure you are in the correct working
directory:

```console
parent_folder/
└── my_sample_agent/
    └── agent.py (or Agent.java)
```

**Launch the Local Server**

Next, launch the local server using the commands listed above.

The output should appear similar to:

=== "Python"

    ```shell
    INFO:     Started server process [12345]
    INFO:     Waiting for application startup.
    INFO:     Application startup complete.
    INFO:     Uvicorn running on http://localhost:8000 (Press CTRL+C to quit)
    ```

=== "Java"

    ```shell
    2025-05-13T23:32:08.972-06:00  INFO 37864 --- [ebServer.main()] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
    2025-05-13T23:32:08.980-06:00  INFO 37864 --- [ebServer.main()] com.google.adk.web.AdkWebServer          : Started AdkWebServer in 1.15 seconds (process running for 2.877)
    2025-05-13T23:32:08.981-06:00  INFO 37864 --- [ebServer.main()] com.google.adk.web.AdkWebServer          : AdkWebServer application started successfully.
    ```

Your server is now running locally. Ensure you use the correct **_port number_** in all the subsequent commands.

**Create a new session**

With the API server still running, open a new terminal window or tab and create
a new session with the agent using:

```shell
curl -X POST http://localhost:8000/apps/my_sample_agent/users/u_123/sessions/s_123 \
  -H "Content-Type: application/json" \
  -d '{"state": {"key1": "value1", "key2": 42}}'
```

Let's break down what's happening:

* `http://localhost:8000/apps/my_sample_agent/users/u_123/sessions/s_123`: This
  creates a new session for your agent `my_sample_agent`, which is the name of
  the agent folder, for a user ID (`u_123`) and for a session ID (`s_123`). You
  can replace `my_sample_agent` with the name of your agent folder. You can
  replace `u_123` with a specific user ID, and `s_123` with a specific session
  ID.
* `{"state": {"key1": "value1", "key2": 42}}`: This is optional. You can use
  this to customize the agent's pre-existing state (dict) when creating the
  session.

This should return the session information if it was created successfully. The
output should appear similar to:

```shell
{"id":"s_123","appName":"my_sample_agent","userId":"u_123","state":{"state":{"key1":"value1","key2":42}},"events":[],"lastUpdateTime":1743711430.022186}
```

!!! info

    You cannot create multiple sessions with exactly the same user ID and
    session ID. If you try to, you may see a response, like:
    `{"detail":"Session already exists: s_123"}`. To fix this, you can either
    delete that session (e.g., `s_123`), or choose a different session ID.

**Send a query**

There are two ways to send queries via POST to your agent, via the `/run` or
`/run_sse` routes.

* `POST http://localhost:8000/run`: collects all events as a list and returns the
  list all at once. Suitable for most users (if you are unsure, we recommend
  using this one).
* `POST http://localhost:8000/run_sse`: returns as Server-Sent-Events, which is a
  stream of event objects. Suitable for those who want to be notified as soon as
  the event is available. With `/run_sse`, you can also set `streaming` to
  `true` to enable token-level streaming.

**Using `/run`**

```shell
curl -X POST http://localhost:8000/run \
-H "Content-Type: application/json" \
-d '{
"appName": "my_sample_agent",
"userId": "u_123",
"sessionId": "s_123",
"newMessage": {
    "role": "user",
    "parts": [{
    "text": "Hey whats the weather in new york today"
    }]
}
}'
```

If using `/run`, you will see the full output of events at the same time, as a
list, which should appear similar to:

```shell
[{"content":{"parts":[{"functionCall":{"id":"af-e75e946d-c02a-4aad-931e-49e4ab859838","args":{"city":"new york"},"name":"get_weather"}}],"role":"model"},"invocationId":"e-71353f1e-aea1-4821-aa4b-46874a766853","author":"weather_time_agent","actions":{"stateDelta":{},"artifactDelta":{},"requestedAuthConfigs":{}},"longRunningToolIds":[],"id":"2Btee6zW","timestamp":1743712220.385936},{"content":{"parts":[{"functionResponse":{"id":"af-e75e946d-c02a-4aad-931e-49e4ab859838","name":"get_weather","response":{"status":"success","report":"The weather in New York is sunny with a temperature of 25 degrees Celsius (41 degrees Fahrenheit)."}}}],"role":"user"},"invocationId":"e-71353f1e-aea1-4821-aa4b-46874a766853","author":"weather_time_agent","actions":{"stateDelta":{},"artifactDelta":{},"requestedAuthConfigs":{}},"id":"PmWibL2m","timestamp":1743712221.895042},{"content":{"parts":[{"text":"OK. The weather in New York is sunny with a temperature of 25 degrees Celsius (41 degrees Fahrenheit).\n"}],"role":"model"},"invocationId":"e-71353f1e-aea1-4821-aa4b-46874a766853","author":"weather_time_agent","actions":{"stateDelta":{},"artifactDelta":{},"requestedAuthConfigs":{}},"id":"sYT42eVC","timestamp":1743712221.899018}]
```

**Using `/run_sse`**

```shell
curl -X POST http://localhost:8000/run_sse \
-H "Content-Type: application/json" \
-d '{
"appName": "my_sample_agent",
"userId": "u_123",
"sessionId": "s_123",
"newMessage": {
    "role": "user",
    "parts": [{
    "text": "Hey whats the weather in new york today"
    }]
},
"streaming": false
}'
```

You can set `streaming` to `true` to enable token-level streaming, which means
the response will be returned to you in multiple chunks and the output should
appear similar to:


```shell
data: {"content":{"parts":[{"functionCall":{"id":"af-f83f8af9-f732-46b6-8cb5-7b5b73bbf13d","args":{"city":"new york"},"name":"get_weather"}}],"role":"model"},"invocationId":"e-3f6d7765-5287-419e-9991-5fffa1a75565","author":"weather_time_agent","actions":{"stateDelta":{},"artifactDelta":{},"requestedAuthConfigs":{}},"longRunningToolIds":[],"id":"ptcjaZBa","timestamp":1743712255.313043}

data: {"content":{"parts":[{"functionResponse":{"id":"af-f83f8af9-f732-46b6-8cb5-7b5b73bbf13d","name":"get_weather","response":{"status":"success","report":"The weather in New York is sunny with a temperature of 25 degrees Celsius (41 degrees Fahrenheit)."}}}],"role":"user"},"invocationId":"e-3f6d7765-5287-419e-9991-5fffa1a75565","author":"weather_time_agent","actions":{"stateDelta":{},"artifactDelta":{},"requestedAuthConfigs":{}},"id":"5aocxjaq","timestamp":1743712257.387306}

data: {"content":{"parts":[{"text":"OK. The weather in New York is sunny with a temperature of 25 degrees Celsius (41 degrees Fahrenheit).\n"}],"role":"model"},"invocationId":"e-3f6d7765-5287-419e-9991-5fffa1a75565","author":"weather_time_agent","actions":{"stateDelta":{},"artifactDelta":{},"requestedAuthConfigs":{}},"id":"rAnWGSiV","timestamp":1743712257.391317}
```

!!! info

    If you are using `/run_sse`, you should see each event as soon as it becomes
    available.

## Integrations

ADK uses [Callbacks](../callbacks/index.md) to integrate with third-party
observability tools. These integrations capture detailed traces of agent calls
and interactions, which are crucial for understanding behavior, debugging
issues, and evaluating performance.

* [Comet Opik](https://github.com/comet-ml/opik) is an open-source LLM
  observability and evaluation platform that
  [natively supports ADK](https://www.comet.com/docs/opik/tracing/integrations/adk).

## Deploying your agent

Now that you've verified the local operation of your agent, you're ready to move
on to deploying your agent! Here are some ways you can deploy your agent:

* Deploy to [Agent Engine](../deploy/agent-engine.md), the easiest way to deploy
  your ADK agents to a managed service in Vertex AI on Google Cloud.
* Deploy to [Cloud Run](../deploy/cloud-run.md) and have full control over how
  you scale and manage your agents using serverless architecture on Google
  Cloud.



================================================
FILE: docs/get-started/streaming/index.md
================================================
# Streaming Quickstarts

The Agent Development Kit (ADK) enables real-time, interactive experiences with your AI agents through streaming. This allows for features like live voice conversations, real-time tool use, and continuous updates from your agent.

This page provides quickstart examples to get you up and running with streaming capabilities in both Python and Java ADK.

<div class.="grid cards" markdown>

-   :fontawesome-brands-python:{ .lg .middle } **Python ADK: Streaming Quickstart**

    ---
    This example demonstrates how to set up a basic streaming interaction with an agent using Python ADK. It typically involves using the `Runner.run_live()` method and handling asynchronous events.

    [:octicons-arrow-right-24: View Python Streaming Quickstart](quickstart-streaming.md) <br>
    <!-- [:octicons-arrow-right-24: View Python Streaming Quickstart](python/quickstart-streaming.md) -->

<!-- This comment forces a block separation -->

-   :fontawesome-brands-java:{ .lg .middle } **Java ADK: Streaming Quickstart**

    ---
    This example demonstrates how to set up a basic streaming interaction with an agent using Java ADK. It involves using the `Runner.runLive()` method, a `LiveRequestQueue`, and handling the `Flowable<Event>` stream.

    [:octicons-arrow-right-24: View Java Streaming Quickstart](quickstart-streaming-java.md) <br>
    <!-- [:octicons-arrow-right-24: View Java Streaming Quickstart](java/quickstart-streaming-java.md)) -->

</div>



================================================
FILE: docs/get-started/streaming/quickstart-streaming-java.md
================================================
# Quickstart (Streaming / Java) {#adk-streaming-quickstart-java}

This quickstart guide will walk you through the process of creating a basic agent and leveraging ADK Streaming with Java to facilitate low-latency, bidirectional voice interactions.

You'll begin by setting up your Java and Maven environment, structuring your project, and defining the necessary dependencies. Following this, you'll create a simple `ScienceTeacherAgent`, test its text-based streaming capabilities using the Dev UI, and then progress to enabling live audio communication, transforming your agent into an interactive voice-driven application.

## **Create your first agent** {#create-your-first-agent}

### **Prerequisites**

* In this getting started guide, you will be programming in Java. Check if **Java** is installed on your machine. Ideally, you should be using Java 17 or more (you can check that by typing **java \-version**)

* You’ll also be using the **Maven** build tool for Java. So be sure to have [Maven installed](https://maven.apache.org/install.html) on your machine before going further (this is the case for Cloud Top or Cloud Shell, but not necessarily for your laptop).

### **Prepare the project structure**

To get started with ADK Java, let’s create a Maven project with the following directory structure:

```
adk-agents/
├── pom.xml
└── src/
    └── main/
        └── java/
            └── agents/
                └── ScienceTeacherAgent.java
```

Follow the instructions in [Installation](../../get-started/installation.md) page to add `pom.xml` for using the ADK package.

!!! Note
    Feel free to use whichever name you like for the root directory of your project (instead of adk-agents)

### **Running a compilation**

Let’s see if Maven is happy with this build, by running a compilation (**mvn compile** command):

```shell
$ mvn compile
[INFO] Scanning for projects...
[INFO] 
[INFO] --------------------< adk-agents:adk-agents >--------------------
[INFO] Building adk-agents 1.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- resources:3.3.1:resources (default-resources) @ adk-demo ---
[INFO] skip non existing resourceDirectory /home/user/adk-demo/src/main/resources
[INFO] 
[INFO] --- compiler:3.13.0:compile (default-compile) @ adk-demo ---
[INFO] Nothing to compile - all classes are up to date.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.347 s
[INFO] Finished at: 2025-05-06T15:38:08Z
[INFO] ------------------------------------------------------------------------
```

Looks like the project is set up properly for compilation\!

### **Creating an agent**

Create the **ScienceTeacherAgent.java** file under the `src/main/java/agents/` directory with the following content:

```java
package samples.liveaudio;

import com.google.adk.agents.BaseAgent;
import com.google.adk.agents.LlmAgent;

/** Science teacher agent. */
public class ScienceTeacherAgent {

  // Field expected by the Dev UI to load the agent dynamically
  // (the agent must be initialized at declaration time)
  public static BaseAgent ROOT_AGENT = initAgent();

  public static BaseAgent initAgent() {
    return LlmAgent.builder()
        .name("science-app")
        .description("Science teacher agent")
        .model("gemini-2.0-flash-exp")
        .instruction("""
            You are a helpful science teacher that explains
            science concepts to kids and teenagers.
            """)
        .build();
  }
}
```

!!!note "Troubleshooting"

    The model `gemini-2.0-flash-exp` will be deprecated in the future. If you see any issues on using it, try using `gemini-2.0-flash-live-001` instead

We will use `Dev UI` to run this agent later. For the tool to automatically recognize the agent, its Java class has to comply with the following two rules:

* The agent should be stored in a global **public static** variable named **ROOT\_AGENT** of type **BaseAgent** and initialized at declaration time.
* The agent definition has to be a **static** method so it can be loaded during the class initialization by the dynamic compiling classloader.

## **Run agent with Dev UI** {#run-agent-with-adk-web-server}

`Dev UI` is a web server where you can quickly run and test your agents for development purpose, without building your own UI application for the agents.

### **Define environment variables**

To run the server, you’ll need to export two environment variables:

* a Gemini key that you can [get from AI Studio](https://ai.google.dev/gemini-api/docs/api-key),
* a variable to specify we’re not using Vertex AI this time.

```shell
export GOOGLE_GENAI_USE_VERTEXAI=FALSE
export GOOGLE_API_KEY=YOUR_API_KEY
```

### **Run Dev UI**

Run the following command from the terminal to launch the Dev UI.

```console title="terminal"
mvn exec:java \
    -Dexec.mainClass="com.google.adk.web.AdkWebServer" \
    -Dexec.args="--adk.agents.source-dir=src/main/java" \
    -Dexec.classpathScope="compile"
```

**Step 1:** Open the URL provided (usually `http://localhost:8080` or
`http://127.0.0.1:8080`) directly in your browser.

**Step 2.** In the top-left corner of the UI, you can select your agent in
the dropdown. Select "science-app".

!!!note "Troubleshooting"

    If you do not see "science-app" in the dropdown menu, make sure you
    are running the `mvn` command at the location where your Java source code
    is located (usually `src/main/java`).

## Try Dev UI with text

With your favorite browser, navigate to: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

You should see the following interface:

![Dev UI](../../assets/quickstart-streaming-devui.png)

Click the `Token Streaming` switch at the top right, and ask any questions for the science teacher such as `What's the electron?`. Then you should see the output text in streaming on the UI.

As we saw, you do not have to write any specific code in the agent itself for the text streaming capability. It is provided as an ADK Agent feature by default.

### Try with voice and video

To try with voice, reload the web browser, click the microphone button to enable the voice input, and ask the same question in voice. You will hear the answer in voice in real-time.

To try with video, reload the web browser, click the camera button to enable the video input, and ask questions like "What do you see?". The agent will answer what they see in the video input.

### Stop the tool

Stop the tool by pressing `Ctrl-C` on the console.

## **Run agent with a custom live audio app** {#run-agent-with-live-audio}

Now, let's try audio streaming with the agent and a custom live audio application.

### **A Maven pom.xml build file for Live Audio**

Replace your existing pom.xml with the following.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.google.adk.samples</groupId>
  <artifactId>google-adk-sample-live-audio</artifactId>
  <version>0.1.0</version>
  <name>Google ADK - Sample - Live Audio</name>
  <description>
    A sample application demonstrating a live audio conversation using ADK,
    runnable via samples.liveaudio.LiveAudioRun.
  </description>
  <packaging>jar</packaging>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <java.version>17</java.version>
    <auto-value.version>1.11.0</auto-value.version>
    <!-- Main class for exec-maven-plugin -->
    <exec.mainClass>samples.liveaudio.LiveAudioRun</exec.mainClass>
    <google-adk.version>0.1.0</google-adk.version>
  </properties>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>com.google.cloud</groupId>
        <artifactId>libraries-bom</artifactId>
        <version>26.53.0</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <dependencies>
    <dependency>
      <groupId>com.google.adk</groupId>
      <artifactId>google-adk</artifactId>
      <version>${google-adk.version}</version>
    </dependency>
    <dependency>
      <groupId>commons-logging</groupId>
      <artifactId>commons-logging</artifactId>
      <version>1.2</version> <!-- Or use a property if defined in a parent POM -->
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.13.0</version>
        <configuration>
          <source>${java.version}</source>
          <target>${java.version}</target>
          <parameters>true</parameters>
          <annotationProcessorPaths>
            <path>
              <groupId>com.google.auto.value</groupId>
              <artifactId>auto-value</artifactId>
              <version>${auto-value.version}</version>
            </path>
          </annotationProcessorPaths>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>build-helper-maven-plugin</artifactId>
        <version>3.6.0</version>
        <executions>
          <execution>
            <id>add-source</id>
            <phase>generate-sources</phase>
            <goals>
              <goal>add-source</goal>
            </goals>
            <configuration>
              <sources>
                <source>.</source>
              </sources>
            </configuration>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>exec-maven-plugin</artifactId>
        <version>3.2.0</version>
        <configuration>
          <mainClass>${exec.mainClass}</mainClass>
          <classpathScope>runtime</classpathScope>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

### **Creating Live Audio Run tool**

Create the **LiveAudioRun.java** file under the `src/main/java/` directory with the following content. This tool runs the agent on it with live audio input and output.

```java

package samples.liveaudio;

import com.google.adk.agents.LiveRequestQueue;
import com.google.adk.agents.RunConfig;
import com.google.adk.events.Event;
import com.google.adk.runner.Runner;
import com.google.adk.sessions.InMemorySessionService;
import com.google.common.collect.ImmutableList;
import com.google.genai.types.Blob;
import com.google.genai.types.Modality;
import com.google.genai.types.PrebuiltVoiceConfig;
import com.google.genai.types.Content;
import com.google.genai.types.Part;
import com.google.genai.types.SpeechConfig;
import com.google.genai.types.VoiceConfig;
import io.reactivex.rxjava3.core.Flowable;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.Mixer;
import javax.sound.sampled.SourceDataLine;
import javax.sound.sampled.TargetDataLine;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import agents.ScienceTeacherAgent;

/** Main class to demonstrate running the {@link LiveAudioAgent} for a voice conversation. */
public final class LiveAudioRun {
  private final String userId;
  private final String sessionId;
  private final Runner runner;

  private static final javax.sound.sampled.AudioFormat MIC_AUDIO_FORMAT =
      new javax.sound.sampled.AudioFormat(16000.0f, 16, 1, true, false);

  private static final javax.sound.sampled.AudioFormat SPEAKER_AUDIO_FORMAT =
      new javax.sound.sampled.AudioFormat(24000.0f, 16, 1, true, false);

  private static final int BUFFER_SIZE = 4096;

  public LiveAudioRun() {
    this.userId = "test_user";
    String appName = "LiveAudioApp";
    this.sessionId = UUID.randomUUID().toString();

    InMemorySessionService sessionService = new InMemorySessionService();
    this.runner = new Runner(ScienceTeacherAgent.ROOT_AGENT, appName, null, sessionService);

    ConcurrentMap<String, Object> initialState = new ConcurrentHashMap<>();
    var unused =
        sessionService.createSession(appName, userId, initialState, sessionId).blockingGet();
  }

  private void runConversation() throws Exception {
    System.out.println("Initializing microphone input and speaker output...");

    RunConfig runConfig =
        RunConfig.builder()
            .setStreamingMode(RunConfig.StreamingMode.BIDI)
            .setResponseModalities(ImmutableList.of(new Modality("AUDIO")))
            .setSpeechConfig(
                SpeechConfig.builder()
                    .voiceConfig(
                        VoiceConfig.builder()
                            .prebuiltVoiceConfig(
                                PrebuiltVoiceConfig.builder().voiceName("Aoede").build())
                            .build())
                    .languageCode("en-US")
                    .build())
            .build();

    LiveRequestQueue liveRequestQueue = new LiveRequestQueue();

    Flowable<Event> eventStream =
        this.runner.runLive(
            runner.sessionService().createSession(userId, sessionId).blockingGet(),
            liveRequestQueue,
            runConfig);

    AtomicBoolean isRunning = new AtomicBoolean(true);
    AtomicBoolean conversationEnded = new AtomicBoolean(false);
    ExecutorService executorService = Executors.newFixedThreadPool(2);

    // Task for capturing microphone input
    Future<?> microphoneTask =
        executorService.submit(() -> captureAndSendMicrophoneAudio(liveRequestQueue, isRunning));

    // Task for processing agent responses and playing audio
    Future<?> outputTask =
        executorService.submit(
            () -> {
              try {
                processAudioOutput(eventStream, isRunning, conversationEnded);
              } catch (Exception e) {
                System.err.println("Error processing audio output: " + e.getMessage());
                e.printStackTrace();
                isRunning.set(false);
              }
            });

    // Wait for user to press Enter to stop the conversation
    System.out.println("Conversation started. Press Enter to stop...");
    System.in.read();

    System.out.println("Ending conversation...");
    isRunning.set(false);

    try {
      // Give some time for ongoing processing to complete
      microphoneTask.get(2, TimeUnit.SECONDS);
      outputTask.get(2, TimeUnit.SECONDS);
    } catch (Exception e) {
      System.out.println("Stopping tasks...");
    }

    liveRequestQueue.close();
    executorService.shutdownNow();
    System.out.println("Conversation ended.");
  }

  private void captureAndSendMicrophoneAudio(
      LiveRequestQueue liveRequestQueue, AtomicBoolean isRunning) {
    TargetDataLine micLine = null;
    try {
      DataLine.Info info = new DataLine.Info(TargetDataLine.class, MIC_AUDIO_FORMAT);
      if (!AudioSystem.isLineSupported(info)) {
        System.err.println("Microphone line not supported!");
        return;
      }

      micLine = (TargetDataLine) AudioSystem.getLine(info);
      micLine.open(MIC_AUDIO_FORMAT);
      micLine.start();

      System.out.println("Microphone initialized. Start speaking...");

      byte[] buffer = new byte[BUFFER_SIZE];
      int bytesRead;

      while (isRunning.get()) {
        bytesRead = micLine.read(buffer, 0, buffer.length);

        if (bytesRead > 0) {
          byte[] audioChunk = new byte[bytesRead];
          System.arraycopy(buffer, 0, audioChunk, 0, bytesRead);

          Blob audioBlob = Blob.builder().data(audioChunk).mimeType("audio/pcm").build();

          liveRequestQueue.realtime(audioBlob);
        }
      }
    } catch (LineUnavailableException e) {
      System.err.println("Error accessing microphone: " + e.getMessage());
      e.printStackTrace();
    } finally {
      if (micLine != null) {
        micLine.stop();
        micLine.close();
      }
    }
  }

  private void processAudioOutput(
      Flowable<Event> eventStream, AtomicBoolean isRunning, AtomicBoolean conversationEnded) {
    SourceDataLine speakerLine = null;
    try {
      DataLine.Info info = new DataLine.Info(SourceDataLine.class, SPEAKER_AUDIO_FORMAT);
      if (!AudioSystem.isLineSupported(info)) {
        System.err.println("Speaker line not supported!");
        return;
      }

      final SourceDataLine finalSpeakerLine = (SourceDataLine) AudioSystem.getLine(info);
      finalSpeakerLine.open(SPEAKER_AUDIO_FORMAT);
      finalSpeakerLine.start();

      System.out.println("Speaker initialized.");

      for (Event event : eventStream.blockingIterable()) {
        if (!isRunning.get()) {
          break;
        }
        event.content().ifPresent(content -> content.parts().ifPresent(parts -> parts.forEach(part -> playAudioData(part, finalSpeakerLine))));
      }

      speakerLine = finalSpeakerLine; // Assign to outer variable for cleanup in finally block
    } catch (LineUnavailableException e) {
      System.err.println("Error accessing speaker: " + e.getMessage());
      e.printStackTrace();
    } finally {
      if (speakerLine != null) {
        speakerLine.drain();
        speakerLine.stop();
        speakerLine.close();
      }
      conversationEnded.set(true);
    }
  }

  private void playAudioData(Part part, SourceDataLine speakerLine) {
    part.inlineData()
        .ifPresent(
            inlineBlob ->
                inlineBlob
                    .data()
                    .ifPresent(
                        audioBytes -> {
                          if (audioBytes.length > 0) {
                            System.out.printf(
                                "Playing audio (%s): %d bytes%n",
                                inlineBlob.mimeType(),
                                audioBytes.length);
                            speakerLine.write(audioBytes, 0, audioBytes.length);
                          }
                        }));
  }

  private void processEvent(Event event, java.util.concurrent.atomic.AtomicBoolean audioReceived) {
    event
        .content()
        .ifPresent(
            content ->
                content
                    .parts()
                    .ifPresent(parts -> parts.forEach(part -> logReceivedAudioData(part, audioReceived))));
  }

  private void logReceivedAudioData(Part part, AtomicBoolean audioReceived) {
    part.inlineData()
        .ifPresent(
            inlineBlob ->
                inlineBlob
                    .data()
                    .ifPresent(
                        audioBytes -> {
                          if (audioBytes.length > 0) {
                            System.out.printf(
                                "    Audio (%s): received %d bytes.%n",
                                inlineBlob.mimeType(),
                                audioBytes.length);
                            audioReceived.set(true);
                          } else {
                            System.out.printf(
                                "    Audio (%s): received empty audio data.%n",
                                inlineBlob.mimeType());
                          }
                        }));
  }

  public static void main(String[] args) throws Exception {
    LiveAudioRun liveAudioRun = new LiveAudioRun();
    liveAudioRun.runConversation();
    System.out.println("Exiting Live Audio Run.");
  }
}
```

### **Run the Live Audio Run tool**

To run Live Audio Run tool, use the following command on the `adk-agents` directory:

```
mvn compile exec:java
```

Then you should see:

```
$ mvn compile exec:java
...
Initializing microphone input and speaker output...
Conversation started. Press Enter to stop...
Speaker initialized.
Microphone initialized. Start speaking...
```

With this message, the tool is ready to take voice input. Talk to the agent with a question like `What's the electron?`.

!!! Caution
    When you observe the agent keep speaking by itself and doesn't stop, try using earphones to suppress the echoing.

## **Summary** {#summary}

Streaming for ADK enables developers to create agents capable of low-latency, bidirectional voice and video communication, enhancing interactive experiences. The article demonstrates that text streaming is a built-in feature of ADK Agents, requiring no additional specific code, while also showcasing how to implement live audio conversations for real-time voice interaction with an agent. This allows for more natural and dynamic communication, as users can speak to and hear from the agent seamlessly.



================================================
FILE: docs/get-started/streaming/quickstart-streaming.md
================================================
# Quickstart (Streaming / Python) {#adk-streaming-quickstart}

With this quickstart, you'll learn to create a simple agent and use ADK Streaming to enable voice and video communication with it that is low-latency and bidirectional. We will install ADK, set up a basic "Google Search" agent, try running the agent with Streaming with `adk web` tool, and then explain how to build a simple asynchronous web app by yourself using ADK Streaming and [FastAPI](https://fastapi.tiangolo.com/).

**Note:** This guide assumes you have experience using a terminal in Windows, Mac, and Linux environments.

## Supported models for voice/video streaming {#supported-models}

In order to use voice/video streaming in ADK, you will need to use Gemini models that support the Live API. You can find the **model ID(s)** that supports the Gemini Live API in the documentation:

- [Google AI Studio: Gemini Live API](https://ai.google.dev/gemini-api/docs/models#live-api)
- [Vertex AI: Gemini Live API](https://cloud.google.com/vertex-ai/generative-ai/docs/live-api)

## 1. Setup Environment & Install ADK {#1.-setup-installation}

Create & Activate Virtual Environment (Recommended):

```bash
# Create
python -m venv .venv
# Activate (each new terminal)
# macOS/Linux: source .venv/bin/activate
# Windows CMD: .venv\Scripts\activate.bat
# Windows PowerShell: .venv\Scripts\Activate.ps1
```

Install ADK:

```bash
pip install google-adk
```

## 2. Project Structure {#2.-project-structure}

Create the following folder structure with empty files:

```console
adk-streaming/  # Project folder
└── app/ # the web app folder
    ├── .env # Gemini API key
    └── google_search_agent/ # Agent folder
        ├── __init__.py # Python package
        └── agent.py # Agent definition
```

### agent.py

Copy-paste the following code block into the `agent.py` file.

For `model`, please double check the model ID as described earlier in the [Models section](#supported-models).

```py
from google.adk.agents import Agent
from google.adk.tools import google_search  # Import the tool

root_agent = Agent(
   # A unique name for the agent.
   name="basic_search_agent",
   # The Large Language Model (LLM) that agent will use.
   # Please fill in the latest model id that supports live from
   # https://google.github.io/adk-docs/get-started/streaming/quickstart-streaming/#supported-models
   model="...",  # for example: model="gemini-2.0-flash-live-001" or model="gemini-2.0-flash-live-preview-04-09"
   # A short description of the agent's purpose.
   description="Agent to answer questions using Google Search.",
   # Instructions to set the agent's behavior.
   instruction="You are an expert researcher. You always stick to the facts.",
   # Add google_search tool to perform grounding with Google search.
   tools=[google_search]
)
```

`agent.py` is where all your agent(s)' logic will be stored, and you must have a `root_agent` defined.

Notice how easily you integrated [grounding with Google Search](https://ai.google.dev/gemini-api/docs/grounding?lang=python#configure-search) capabilities.  The `Agent` class and the `google_search` tool handle the complex interactions with the LLM and grounding with the search API, allowing you to focus on the agent's *purpose* and *behavior*.

![intro_components.png](../../assets/quickstart-streaming-tool.png)

Copy-paste the following code block to `__init__.py` file.

```py title="__init__.py"
from . import agent
```

## 3\. Set up the platform {#3.-set-up-the-platform}

To run the agent, choose a platform from either Google AI Studio or Google Cloud Vertex AI:

=== "Gemini - Google AI Studio"
    1. Get an API key from [Google AI Studio](https://aistudio.google.com/apikey).
    2. Open the **`.env`** file located inside (`app/`) and copy-paste the following code.

        ```env title=".env"
        GOOGLE_GENAI_USE_VERTEXAI=FALSE
        GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_API_KEY_HERE
        ```

    3. Replace `PASTE_YOUR_ACTUAL_API_KEY_HERE` with your actual `API KEY`.

=== "Gemini - Google Cloud Vertex AI"
    1. You need an existing
       [Google Cloud](https://cloud.google.com/?e=48754805&hl=en) account and a
       project.
        * Set up a
          [Google Cloud project](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#setup-gcp)
        * Set up the
          [gcloud CLI](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstarts/quickstart-multimodal#setup-local)
        * Authenticate to Google Cloud, from the terminal by running
          `gcloud auth login`.
        * [Enable the Vertex AI API](https://console.cloud.google.com/flows/enableapi?apiid=aiplatform.googleapis.com).
    2. Open the **`.env`** file located inside (`app/`). Copy-paste
       the following code and update the project ID and location.

        ```env title=".env"
        GOOGLE_GENAI_USE_VERTEXAI=TRUE
        GOOGLE_CLOUD_PROJECT=PASTE_YOUR_ACTUAL_PROJECT_ID
        GOOGLE_CLOUD_LOCATION=us-central1
        ```

## 4. Try the agent with `adk web` {#4.-try-it-adk-web}

Now it's ready to try the agent. Run the following command to launch the **dev UI**. First, make sure to set the current directory to `app`:

```shell
cd app
```

Also, set `SSL_CERT_FILE` variable with the following command. This is required for the voice and video tests later.

```shell
export SSL_CERT_FILE=$(python -m certifi)
```

Then, run the dev UI:

```shell
adk web
```

!!!info "Note for Windows users"

    When hitting the `_make_subprocess_transport NotImplementedError`, consider using `adk web --no-reload` instead.


Open the URL provided (usually `http://localhost:8000` or
`http://127.0.0.1:8000`) **directly in your browser**. This connection stays
entirely on your local machine. Select `google_search_agent`.

### Try with text

Try the following prompts by typing them in the UI.

* What is the weather in New York?
* What is the time in New York?
* What is the weather in Paris?
* What is the time in Paris?

The agent will use the google_search tool to get the latest information to answer those questions.

### Try with voice and video

To try with voice, reload the web browser, click the microphone button to enable the voice input, and ask the same question in voice. You will hear the answer in voice in real-time.

To try with video, reload the web browser, click the camera button to enable the video input, and ask questions like "What do you see?". The agent will answer what they see in the video input.

(Just clicking the microphone or camera button once is enough. Your voice or video will be streamed to models and the model response will be streamed back continuously. Clicking on the microphone or camera button multiple times is not supported.)

### Stop the tool

Stop `adk web` by pressing `Ctrl-C` on the console.

### Note on ADK Streaming

The following features will be supported in the future versions of the ADK Streaming: Callback, LongRunningTool, ExampleTool, and Shell agent (e.g. SequentialAgent).

Congratulations\! You've successfully created and interacted with your first Streaming agent using ADK\!

## Next steps: build custom streaming app

In [Custom Audio Streaming app](../../streaming/custom-streaming.md) tutorial, it overviews the server and client code for a custom asynchronous web app built with ADK Streaming and [FastAPI](https://fastapi.tiangolo.com/), enabling real-time, bidirectional audio and text communication.


Directory structure:
└── tutorials/
    ├── agent-team.md
    └── index.md

================================================
FILE: docs/tutorials/agent-team.md
================================================
# Build Your First Intelligent Agent Team: A Progressive Weather Bot with ADK

<!-- Optional outer container for overall padding/spacing -->
<div style="padding: 10px 0;">

  <!-- Line 1: Open in Colab -->
  <!-- This div ensures the link takes up its own line and adds space below -->
  <div style="margin-bottom: 10px;">
    <a href="https://colab.research.google.com/github/google/adk-docs/blob/main/examples/python/tutorial/agent_team/adk_tutorial.ipynb" target="_blank" style="display: inline-flex; align-items: center; gap: 5px; text-decoration: none; color: #4285F4;">
      <img width="32px" src="https://www.gstatic.com/pantheon/images/bigquery/welcome_page/colab-logo.svg" alt="Google Colaboratory logo">
      <span>Open in Colab</span>
    </a>
  </div>

  <!-- Line 2: Share Links -->
  <!-- This div acts as a flex container for the "Share to" text and icons -->
  <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
    <!-- Share Text -->
    <span style="font-weight: bold;">Share to:</span>

    <!-- Social Media Links -->
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A//github/google/adk-docs/blob/main/examples/python/tutorial/agent_team/adk_tutorial.ipynb" target="_blank" title="Share on LinkedIn">
      <img width="20px" src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn logo" style="vertical-align: middle;">
    </a>
    <a href="https://bsky.app/intent/compose?text=https%3A//github/google/adk-docs/blob/main/examples/python/tutorial/agent_team/adk_tutorial.ipynb" target="_blank" title="Share on Bluesky">
      <img width="20px" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Bluesky_Logo.svg" alt="Bluesky logo" style="vertical-align: middle;">
    </a>
    <a href="https://twitter.com/intent/tweet?url=https%3A//github/google/adk-docs/blob/main/examples/python/tutorial/agent_team/adk_tutorial.ipynb" target="_blank" title="Share on X (Twitter)">
      <img width="20px" src="https://upload.wikimedia.org/wikipedia/commons/5/5a/X_icon_2.svg" alt="X logo" style="vertical-align: middle;">
    </a>
    <a href="https://reddit.com/submit?url=https%3A//github/google/adk-docs/blob/main/examples/python/tutorial/agent_team/adk_tutorial.ipynb" target="_blank" title="Share on Reddit">
      <img width="20px" src="https://redditinc.com/hubfs/Reddit%20Inc/Brand/Reddit_Logo.png" alt="Reddit logo" style="vertical-align: middle;">
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//github/google/adk-docs/blob/main/examples/python/tutorial/agent_team/adk_tutorial.ipynb" target="_blank" title="Share on Facebook">
      <img width="20px" src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook logo" style="vertical-align: middle;">
    </a>
  </div>

</div>

This tutorial extends from the [Quickstart example](https://google.github.io/adk-docs/get-started/quickstart/) for [Agent Development Kit](https://google.github.io/adk-docs/get-started/). Now, you're ready to dive deeper and construct a more sophisticated, **multi-agent system**.

We'll embark on building a **Weather Bot agent team**, progressively layering advanced features onto a simple foundation. Starting with a single agent that can look up weather, we will incrementally add capabilities like:

*   Leveraging different AI models (Gemini, GPT, Claude).
*   Designing specialized sub-agents for distinct tasks (like greetings and farewells).
*   Enabling intelligent delegation between agents.
*   Giving agents memory using persistent session state.
*   Implementing crucial safety guardrails using callbacks.

**Why a Weather Bot Team?**

This use case, while seemingly simple, provides a practical and relatable canvas to explore core ADK concepts essential for building complex, real-world agentic applications. You'll learn how to structure interactions, manage state, ensure safety, and orchestrate multiple AI "brains" working together.

**What is ADK Again?**

As a reminder, ADK is a Python framework designed to streamline the development of applications powered by Large Language Models (LLMs). It offers robust building blocks for creating agents that can reason, plan, utilize tools, interact dynamically with users, and collaborate effectively within a team.

**In this advanced tutorial, you will master:**

*   ✅ **Tool Definition & Usage:** Crafting Python functions (`tools`) that grant agents specific abilities (like fetching data) and instructing agents on how to use them effectively.
*   ✅ **Multi-LLM Flexibility:** Configuring agents to utilize various leading LLMs (Gemini, GPT-4o, Claude Sonnet) via LiteLLM integration, allowing you to choose the best model for each task.
*   ✅ **Agent Delegation & Collaboration:** Designing specialized sub-agents and enabling automatic routing (`auto flow`) of user requests to the most appropriate agent within a team.
*   ✅ **Session State for Memory:** Utilizing `Session State` and `ToolContext` to enable agents to remember information across conversational turns, leading to more contextual interactions.
*   ✅ **Safety Guardrails with Callbacks:** Implementing `before_model_callback` and `before_tool_callback` to inspect, modify, or block requests/tool usage based on predefined rules, enhancing application safety and control.

**End State Expectation:**

By completing this tutorial, you will have built a functional multi-agent Weather Bot system. This system will not only provide weather information but also handle conversational niceties, remember the last city checked, and operate within defined safety boundaries, all orchestrated using ADK.

**Prerequisites:**

*   ✅ **Solid understanding of Python programming.**
*   ✅ **Familiarity with Large Language Models (LLMs), APIs, and the concept of agents.**
*   ❗ **Crucially: Completion of the ADK Quickstart tutorial(s) or equivalent foundational knowledge of ADK basics (Agent, Runner, SessionService, basic Tool usage).** This tutorial builds directly upon those concepts.
*   ✅ **API Keys** for the LLMs you intend to use (e.g., Google AI Studio for Gemini, OpenAI Platform, Anthropic Console).


---

**Note on Execution Environment:**

This tutorial is structured for interactive notebook environments like Google Colab, Colab Enterprise, or Jupyter notebooks. Please keep the following in mind:

*   **Running Async Code:** Notebook environments handle asynchronous code differently. You'll see examples using `await` (suitable when an event loop is already running, common in notebooks) or `asyncio.run()` (often needed when running as a standalone `.py` script or in specific notebook setups). The code blocks provide guidance for both scenarios.
*   **Manual Runner/Session Setup:** The steps involve explicitly creating `Runner` and `SessionService` instances. This approach is shown because it gives you fine-grained control over the agent's execution lifecycle, session management, and state persistence.

**Alternative: Using ADK's Built-in Tools (Web UI / CLI / API Server)**

If you prefer a setup that handles the runner and session management automatically using ADK's standard tools, you can find the equivalent code structured for that purpose [here](https://github.com/google/adk-docs/tree/main/examples/python/tutorial/agent_team/adk-tutorial). That version is designed to be run directly with commands like `adk web` (for a web UI), `adk run` (for CLI interaction), or `adk api_server` (to expose an API). Please follow the `README.md` instructions provided in that alternative resource.

---

**Ready to build your agent team? Let's dive in!**

> **Note:** This tutorial works with adk version 1.0.0 and above

```python
# @title Step 0: Setup and Installation
# Install ADK and LiteLLM for multi-model support

!pip install google-adk -q
!pip install litellm -q

print("Installation complete.")
```


```python
# @title Import necessary libraries
import os
import asyncio
from google.adk.agents import Agent
from google.adk.models.lite_llm import LiteLlm # For multi-model support
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types # For creating message Content/Parts

import warnings
# Ignore all warnings
warnings.filterwarnings("ignore")

import logging
logging.basicConfig(level=logging.ERROR)

print("Libraries imported.")
```


```python
# @title Configure API Keys (Replace with your actual keys!)

# --- IMPORTANT: Replace placeholders with your real API keys ---

# Gemini API Key (Get from Google AI Studio: https://aistudio.google.com/app/apikey)
os.environ["GOOGLE_API_KEY"] = "YOUR_GOOGLE_API_KEY" # <--- REPLACE

# [Optional]
# OpenAI API Key (Get from OpenAI Platform: https://platform.openai.com/api-keys)
os.environ['OPENAI_API_KEY'] = 'YOUR_OPENAI_API_KEY' # <--- REPLACE

# [Optional]
# Anthropic API Key (Get from Anthropic Console: https://console.anthropic.com/settings/keys)
os.environ['ANTHROPIC_API_KEY'] = 'YOUR_ANTHROPIC_API_KEY' # <--- REPLACE

# --- Verify Keys (Optional Check) ---
print("API Keys Set:")
print(f"Google API Key set: {'Yes' if os.environ.get('GOOGLE_API_KEY') and os.environ['GOOGLE_API_KEY'] != 'YOUR_GOOGLE_API_KEY' else 'No (REPLACE PLACEHOLDER!)'}")
print(f"OpenAI API Key set: {'Yes' if os.environ.get('OPENAI_API_KEY') and os.environ['OPENAI_API_KEY'] != 'YOUR_OPENAI_API_KEY' else 'No (REPLACE PLACEHOLDER!)'}")
print(f"Anthropic API Key set: {'Yes' if os.environ.get('ANTHROPIC_API_KEY') and os.environ['ANTHROPIC_API_KEY'] != 'YOUR_ANTHROPIC_API_KEY' else 'No (REPLACE PLACEHOLDER!)'}")

# Configure ADK to use API keys directly (not Vertex AI for this multi-model setup)
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "False"


# @markdown **Security Note:** It's best practice to manage API keys securely (e.g., using Colab Secrets or environment variables) rather than hardcoding them directly in the notebook. Replace the placeholder strings above.
```


```python
# --- Define Model Constants for easier use ---

# More supported models can be referenced here: https://ai.google.dev/gemini-api/docs/models#model-variations
MODEL_GEMINI_2_0_FLASH = "gemini-2.0-flash"

# More supported models can be referenced here: https://docs.litellm.ai/docs/providers/openai#openai-chat-completion-models
MODEL_GPT_4O = "openai/gpt-4.1" # You can also try: gpt-4.1-mini, gpt-4o etc.

# More supported models can be referenced here: https://docs.litellm.ai/docs/providers/anthropic
MODEL_CLAUDE_SONNET = "anthropic/claude-sonnet-4-20250514" # You can also try: claude-opus-4-20250514 , claude-3-7-sonnet-20250219 etc

print("\nEnvironment configured.")
```

---

## Step 1: Your First Agent \- Basic Weather Lookup

Let's begin by building the fundamental component of our Weather Bot: a single agent capable of performing a specific task – looking up weather information. This involves creating two core pieces:

1. **A Tool:** A Python function that equips the agent with the *ability* to fetch weather data.  
2. **An Agent:** The AI "brain" that understands the user's request, knows it has a weather tool, and decides when and how to use it.

---

**1\. Define the Tool (`get_weather`)**

In ADK, **Tools** are the building blocks that give agents concrete capabilities beyond just text generation. They are typically regular Python functions that perform specific actions, like calling an API, querying a database, or performing calculations.

Our first tool will provide a *mock* weather report. This allows us to focus on the agent structure without needing external API keys yet. Later, you could easily swap this mock function with one that calls a real weather service.

**Key Concept: Docstrings are Crucial\!** The agent's LLM relies heavily on the function's **docstring** to understand:

* *What* the tool does.  
* *When* to use it.  
* *What arguments* it requires (`city: str`).  
* *What information* it returns.

**Best Practice:** Write clear, descriptive, and accurate docstrings for your tools. This is essential for the LLM to use the tool correctly.


```python
# @title Define the get_weather Tool
def get_weather(city: str) -> dict:
    """Retrieves the current weather report for a specified city.

    Args:
        city (str): The name of the city (e.g., "New York", "London", "Tokyo").

    Returns:
        dict: A dictionary containing the weather information.
              Includes a 'status' key ('success' or 'error').
              If 'success', includes a 'report' key with weather details.
              If 'error', includes an 'error_message' key.
    """
    print(f"--- Tool: get_weather called for city: {city} ---") # Log tool execution
    city_normalized = city.lower().replace(" ", "") # Basic normalization

    # Mock weather data
    mock_weather_db = {
        "newyork": {"status": "success", "report": "The weather in New York is sunny with a temperature of 25°C."},
        "london": {"status": "success", "report": "It's cloudy in London with a temperature of 15°C."},
        "tokyo": {"status": "success", "report": "Tokyo is experiencing light rain and a temperature of 18°C."},
    }

    if city_normalized in mock_weather_db:
        return mock_weather_db[city_normalized]
    else:
        return {"status": "error", "error_message": f"Sorry, I don't have weather information for '{city}'."}

# Example tool usage (optional test)
print(get_weather("New York"))
print(get_weather("Paris"))
```

---

**2\. Define the Agent (`weather_agent`)**

Now, let's create the **Agent** itself. An `Agent` in ADK orchestrates the interaction between the user, the LLM, and the available tools.

We configure it with several key parameters:

* `name`: A unique identifier for this agent (e.g., "weather\_agent\_v1").  
* `model`: Specifies which LLM to use (e.g., `MODEL_GEMINI_2_0_FLASH`). We'll start with a specific Gemini model.  
* `description`: A concise summary of the agent's overall purpose. This becomes crucial later when other agents need to decide whether to delegate tasks to *this* agent.  
* `instruction`: Detailed guidance for the LLM on how to behave, its persona, its goals, and specifically *how and when* to utilize its assigned `tools`.  
* `tools`: A list containing the actual Python tool functions the agent is allowed to use (e.g., `[get_weather]`).

**Best Practice:** Provide clear and specific `instruction` prompts. The more detailed the instructions, the better the LLM can understand its role and how to use its tools effectively. Be explicit about error handling if needed.

**Best Practice:** Choose descriptive `name` and `description` values. These are used internally by ADK and are vital for features like automatic delegation (covered later).


```python
# @title Define the Weather Agent
# Use one of the model constants defined earlier
AGENT_MODEL = MODEL_GEMINI_2_0_FLASH # Starting with Gemini

weather_agent = Agent(
    name="weather_agent_v1",
    model=AGENT_MODEL, # Can be a string for Gemini or a LiteLlm object
    description="Provides weather information for specific cities.",
    instruction="You are a helpful weather assistant. "
                "When the user asks for the weather in a specific city, "
                "use the 'get_weather' tool to find the information. "
                "If the tool returns an error, inform the user politely. "
                "If the tool is successful, present the weather report clearly.",
    tools=[get_weather], # Pass the function directly
)

print(f"Agent '{weather_agent.name}' created using model '{AGENT_MODEL}'.")
```

---

**3\. Setup Runner and Session Service**

To manage conversations and execute the agent, we need two more components:

* `SessionService`: Responsible for managing conversation history and state for different users and sessions. The `InMemorySessionService` is a simple implementation that stores everything in memory, suitable for testing and simple applications. It keeps track of the messages exchanged. We'll explore state persistence more in Step 4\.  
* `Runner`: The engine that orchestrates the interaction flow. It takes user input, routes it to the appropriate agent, manages calls to the LLM and tools based on the agent's logic, handles session updates via the `SessionService`, and yields events representing the progress of the interaction.


```python
# @title Setup Session Service and Runner

# --- Session Management ---
# Key Concept: SessionService stores conversation history & state.
# InMemorySessionService is simple, non-persistent storage for this tutorial.
session_service = InMemorySessionService()

# Define constants for identifying the interaction context
APP_NAME = "weather_tutorial_app"
USER_ID = "user_1"
SESSION_ID = "session_001" # Using a fixed ID for simplicity

# Create the specific session where the conversation will happen
session = await session_service.create_session(
    app_name=APP_NAME,
    user_id=USER_ID,
    session_id=SESSION_ID
)
print(f"Session created: App='{APP_NAME}', User='{USER_ID}', Session='{SESSION_ID}'")

# --- Runner ---
# Key Concept: Runner orchestrates the agent execution loop.
runner = Runner(
    agent=weather_agent, # The agent we want to run
    app_name=APP_NAME,   # Associates runs with our app
    session_service=session_service # Uses our session manager
)
print(f"Runner created for agent '{runner.agent.name}'.")
```

---

**4\. Interact with the Agent**

We need a way to send messages to our agent and receive its responses. Since LLM calls and tool executions can take time, ADK's `Runner` operates asynchronously.

We'll define an `async` helper function (`call_agent_async`) that:

1. Takes a user query string.  
2. Packages it into the ADK `Content` format.  
3. Calls `runner.run_async`, providing the user/session context and the new message.  
4. Iterates through the **Events** yielded by the runner. Events represent steps in the agent's execution (e.g., tool call requested, tool result received, intermediate LLM thought, final response).  
5. Identifies and prints the **final response** event using `event.is_final_response()`.

**Why `async`?** Interactions with LLMs and potentially tools (like external APIs) are I/O-bound operations. Using `asyncio` allows the program to handle these operations efficiently without blocking execution.


```python
# @title Define Agent Interaction Function

from google.genai import types # For creating message Content/Parts

async def call_agent_async(query: str, runner, user_id, session_id):
  """Sends a query to the agent and prints the final response."""
  print(f"\n>>> User Query: {query}")

  # Prepare the user's message in ADK format
  content = types.Content(role='user', parts=[types.Part(text=query)])

  final_response_text = "Agent did not produce a final response." # Default

  # Key Concept: run_async executes the agent logic and yields Events.
  # We iterate through events to find the final answer.
  async for event in runner.run_async(user_id=user_id, session_id=session_id, new_message=content):
      # You can uncomment the line below to see *all* events during execution
      # print(f"  [Event] Author: {event.author}, Type: {type(event).__name__}, Final: {event.is_final_response()}, Content: {event.content}")

      # Key Concept: is_final_response() marks the concluding message for the turn.
      if event.is_final_response():
          if event.content and event.content.parts:
             # Assuming text response in the first part
             final_response_text = event.content.parts[0].text
          elif event.actions and event.actions.escalate: # Handle potential errors/escalations
             final_response_text = f"Agent escalated: {event.error_message or 'No specific message.'}"
          # Add more checks here if needed (e.g., specific error codes)
          break # Stop processing events once the final response is found

  print(f"<<< Agent Response: {final_response_text}")
```

---

**5\. Run the Conversation**

Finally, let's test our setup by sending a few queries to the agent. We wrap our `async` calls in a main `async` function and run it using `await`.

Watch the output:

* See the user queries.  
* Notice the `--- Tool: get_weather called... ---` logs when the agent uses the tool.  
* Observe the agent's final responses, including how it handles the case where weather data isn't available (for Paris).


```python
# @title Run the Initial Conversation

# We need an async function to await our interaction helper
async def run_conversation():
    await call_agent_async("What is the weather like in London?",
                                       runner=runner,
                                       user_id=USER_ID,
                                       session_id=SESSION_ID)

    await call_agent_async("How about Paris?",
                                       runner=runner,
                                       user_id=USER_ID,
                                       session_id=SESSION_ID) # Expecting the tool's error message

    await call_agent_async("Tell me the weather in New York",
                                       runner=runner,
                                       user_id=USER_ID,
                                       session_id=SESSION_ID)

# Execute the conversation using await in an async context (like Colab/Jupyter)
await run_conversation()

# --- OR ---

# Uncomment the following lines if running as a standard Python script (.py file):
# import asyncio
# if __name__ == "__main__":
#     try:
#         asyncio.run(run_conversation())
#     except Exception as e:
#         print(f"An error occurred: {e}")
```

---

Congratulations\! You've successfully built and interacted with your first ADK agent. It understands the user's request, uses a tool to find information, and responds appropriately based on the tool's result.

In the next step, we'll explore how to easily switch the underlying Language Model powering this agent.

## Step 2: Going Multi-Model with LiteLLM [Optional]

In Step 1, we built a functional Weather Agent powered by a specific Gemini model. While effective, real-world applications often benefit from the flexibility to use *different* Large Language Models (LLMs). Why?

*   **Performance:** Some models excel at specific tasks (e.g., coding, reasoning, creative writing).
*   **Cost:** Different models have varying price points.
*   **Capabilities:** Models offer diverse features, context window sizes, and fine-tuning options.
*   **Availability/Redundancy:** Having alternatives ensures your application remains functional even if one provider experiences issues.

ADK makes switching between models seamless through its integration with the [**LiteLLM**](https://github.com/BerriAI/litellm) library. LiteLLM acts as a consistent interface to over 100 different LLMs.

**In this step, we will:**

1.  Learn how to configure an ADK `Agent` to use models from providers like OpenAI (GPT) and Anthropic (Claude) using the `LiteLlm` wrapper.
2.  Define, configure (with their own sessions and runners), and immediately test instances of our Weather Agent, each backed by a different LLM.
3.  Interact with these different agents to observe potential variations in their responses, even when using the same underlying tool.

---

**1\. Import `LiteLlm`**

We imported this during the initial setup (Step 0), but it's the key component for multi-model support:


```python
# @title 1. Import LiteLlm
from google.adk.models.lite_llm import LiteLlm
```

**2\. Define and Test Multi-Model Agents**

Instead of passing only a model name string (which defaults to Google's Gemini models), we wrap the desired model identifier string within the `LiteLlm` class.

*   **Key Concept: `LiteLlm` Wrapper:** The `LiteLlm(model="provider/model_name")` syntax tells ADK to route requests for this agent through the LiteLLM library to the specified model provider.

Make sure you have configured the necessary API keys for OpenAI and Anthropic in Step 0. We'll use the `call_agent_async` function (defined earlier, which now accepts `runner`, `user_id`, and `session_id`) to interact with each agent immediately after its setup.

Each block below will:

*   Define the agent using a specific LiteLLM model (`MODEL_GPT_4O` or `MODEL_CLAUDE_SONNET`).
*   Create a *new, separate* `InMemorySessionService` and session specifically for that agent's test run. This keeps the conversation histories isolated for this demonstration.
*   Create a `Runner` configured for the specific agent and its session service.
*   Immediately call `call_agent_async` to send a query and test the agent.

**Best Practice:** Use constants for model names (like `MODEL_GPT_4O`, `MODEL_CLAUDE_SONNET` defined in Step 0) to avoid typos and make code easier to manage.

**Error Handling:** We wrap the agent definitions in `try...except` blocks. This prevents the entire code cell from failing if an API key for a specific provider is missing or invalid, allowing the tutorial to proceed with the models that *are* configured.

First, let's create and test the agent using OpenAI's GPT-4o.


```python
# @title Define and Test GPT Agent

# Make sure 'get_weather' function from Step 1 is defined in your environment.
# Make sure 'call_agent_async' is defined from earlier.

# --- Agent using GPT-4o ---
weather_agent_gpt = None # Initialize to None
runner_gpt = None      # Initialize runner to None

try:
    weather_agent_gpt = Agent(
        name="weather_agent_gpt",
        # Key change: Wrap the LiteLLM model identifier
        model=LiteLlm(model=MODEL_GPT_4O),
        description="Provides weather information (using GPT-4o).",
        instruction="You are a helpful weather assistant powered by GPT-4o. "
                    "Use the 'get_weather' tool for city weather requests. "
                    "Clearly present successful reports or polite error messages based on the tool's output status.",
        tools=[get_weather], # Re-use the same tool
    )
    print(f"Agent '{weather_agent_gpt.name}' created using model '{MODEL_GPT_4O}'.")

    # InMemorySessionService is simple, non-persistent storage for this tutorial.
    session_service_gpt = InMemorySessionService() # Create a dedicated service

    # Define constants for identifying the interaction context
    APP_NAME_GPT = "weather_tutorial_app_gpt" # Unique app name for this test
    USER_ID_GPT = "user_1_gpt"
    SESSION_ID_GPT = "session_001_gpt" # Using a fixed ID for simplicity

    # Create the specific session where the conversation will happen
    session_gpt = await session_service_gpt.create_session(
        app_name=APP_NAME_GPT,
        user_id=USER_ID_GPT,
        session_id=SESSION_ID_GPT
    )
    print(f"Session created: App='{APP_NAME_GPT}', User='{USER_ID_GPT}', Session='{SESSION_ID_GPT}'")

    # Create a runner specific to this agent and its session service
    runner_gpt = Runner(
        agent=weather_agent_gpt,
        app_name=APP_NAME_GPT,       # Use the specific app name
        session_service=session_service_gpt # Use the specific session service
        )
    print(f"Runner created for agent '{runner_gpt.agent.name}'.")

    # --- Test the GPT Agent ---
    print("\n--- Testing GPT Agent ---")
    # Ensure call_agent_async uses the correct runner, user_id, session_id
    await call_agent_async(query = "What's the weather in Tokyo?",
                           runner=runner_gpt,
                           user_id=USER_ID_GPT,
                           session_id=SESSION_ID_GPT)
    # --- OR ---

    # Uncomment the following lines if running as a standard Python script (.py file):
    # import asyncio
    # if __name__ == "__main__":
    #     try:
    #         asyncio.run(call_agent_async(query = "What's the weather in Tokyo?",
    #                      runner=runner_gpt,
    #                       user_id=USER_ID_GPT,
    #                       session_id=SESSION_ID_GPT)
    #     except Exception as e:
    #         print(f"An error occurred: {e}")

except Exception as e:
    print(f"❌ Could not create or run GPT agent '{MODEL_GPT_4O}'. Check API Key and model name. Error: {e}")

```

Next, we'll do the same for Anthropic's Claude Sonnet.


```python
# @title Define and Test Claude Agent

# Make sure 'get_weather' function from Step 1 is defined in your environment.
# Make sure 'call_agent_async' is defined from earlier.

# --- Agent using Claude Sonnet ---
weather_agent_claude = None # Initialize to None
runner_claude = None      # Initialize runner to None

try:
    weather_agent_claude = Agent(
        name="weather_agent_claude",
        # Key change: Wrap the LiteLLM model identifier
        model=LiteLlm(model=MODEL_CLAUDE_SONNET),
        description="Provides weather information (using Claude Sonnet).",
        instruction="You are a helpful weather assistant powered by Claude Sonnet. "
                    "Use the 'get_weather' tool for city weather requests. "
                    "Analyze the tool's dictionary output ('status', 'report'/'error_message'). "
                    "Clearly present successful reports or polite error messages.",
        tools=[get_weather], # Re-use the same tool
    )
    print(f"Agent '{weather_agent_claude.name}' created using model '{MODEL_CLAUDE_SONNET}'.")

    # InMemorySessionService is simple, non-persistent storage for this tutorial.
    session_service_claude = InMemorySessionService() # Create a dedicated service

    # Define constants for identifying the interaction context
    APP_NAME_CLAUDE = "weather_tutorial_app_claude" # Unique app name
    USER_ID_CLAUDE = "user_1_claude"
    SESSION_ID_CLAUDE = "session_001_claude" # Using a fixed ID for simplicity

    # Create the specific session where the conversation will happen
    session_claude = await session_service_claude.create_session(
        app_name=APP_NAME_CLAUDE,
        user_id=USER_ID_CLAUDE,
        session_id=SESSION_ID_CLAUDE
    )
    print(f"Session created: App='{APP_NAME_CLAUDE}', User='{USER_ID_CLAUDE}', Session='{SESSION_ID_CLAUDE}'")

    # Create a runner specific to this agent and its session service
    runner_claude = Runner(
        agent=weather_agent_claude,
        app_name=APP_NAME_CLAUDE,       # Use the specific app name
        session_service=session_service_claude # Use the specific session service
        )
    print(f"Runner created for agent '{runner_claude.agent.name}'.")

    # --- Test the Claude Agent ---
    print("\n--- Testing Claude Agent ---")
    # Ensure call_agent_async uses the correct runner, user_id, session_id
    await call_agent_async(query = "Weather in London please.",
                           runner=runner_claude,
                           user_id=USER_ID_CLAUDE,
                           session_id=SESSION_ID_CLAUDE)

    # --- OR ---

    # Uncomment the following lines if running as a standard Python script (.py file):
    # import asyncio
    # if __name__ == "__main__":
    #     try:
    #         asyncio.run(call_agent_async(query = "Weather in London please.",
    #                      runner=runner_claude,
    #                       user_id=USER_ID_CLAUDE,
    #                       session_id=SESSION_ID_CLAUDE)
    #     except Exception as e:
    #         print(f"An error occurred: {e}")


except Exception as e:
    print(f"❌ Could not create or run Claude agent '{MODEL_CLAUDE_SONNET}'. Check API Key and model name. Error: {e}")
```

Observe the output carefully from both code blocks. You should see:

1.  Each agent (`weather_agent_gpt`, `weather_agent_claude`) is created successfully (if API keys are valid).
2.  A dedicated session and runner are set up for each.
3.  Each agent correctly identifies the need to use the `get_weather` tool when processing the query (you'll see the `--- Tool: get_weather called... ---` log).
4.  The *underlying tool logic* remains identical, always returning our mock data.
5.  However, the **final textual response** generated by each agent might differ slightly in phrasing, tone, or formatting. This is because the instruction prompt is interpreted and executed by different LLMs (GPT-4o vs. Claude Sonnet).

This step demonstrates the power and flexibility ADK + LiteLLM provide. You can easily experiment with and deploy agents using various LLMs while keeping your core application logic (tools, fundamental agent structure) consistent.

In the next step, we'll move beyond a single agent and build a small team where agents can delegate tasks to each other!

---

## Step 3: Building an Agent Team \- Delegation for Greetings & Farewells

In Steps 1 and 2, we built and experimented with a single agent focused solely on weather lookups. While effective for its specific task, real-world applications often involve handling a wider variety of user interactions. We *could* keep adding more tools and complex instructions to our single weather agent, but this can quickly become unmanageable and less efficient.

A more robust approach is to build an **Agent Team**. This involves:

1. Creating multiple, **specialized agents**, each designed for a specific capability (e.g., one for weather, one for greetings, one for calculations).  
2. Designating a **root agent** (or orchestrator) that receives the initial user request.  
3. Enabling the root agent to **delegate** the request to the most appropriate specialized sub-agent based on the user's intent.

**Why build an Agent Team?**

* **Modularity:** Easier to develop, test, and maintain individual agents.  
* **Specialization:** Each agent can be fine-tuned (instructions, model choice) for its specific task.  
* **Scalability:** Simpler to add new capabilities by adding new agents.  
* **Efficiency:** Allows using potentially simpler/cheaper models for simpler tasks (like greetings).

**In this step, we will:**

1. Define simple tools for handling greetings (`say_hello`) and farewells (`say_goodbye`).  
2. Create two new specialized sub-agents: `greeting_agent` and `farewell_agent`.  
3. Update our main weather agent (`weather_agent_v2`) to act as the **root agent**.  
4. Configure the root agent with its sub-agents, enabling **automatic delegation**.  
5. Test the delegation flow by sending different types of requests to the root agent.

---

**1\. Define Tools for Sub-Agents**

First, let's create the simple Python functions that will serve as tools for our new specialist agents. Remember, clear docstrings are vital for the agents that will use them.


```python
# @title Define Tools for Greeting and Farewell Agents
from typing import Optional # Make sure to import Optional

# Ensure 'get_weather' from Step 1 is available if running this step independently.
# def get_weather(city: str) -> dict: ... (from Step 1)

def say_hello(name: Optional[str] = None) -> str:
    """Provides a simple greeting. If a name is provided, it will be used.

    Args:
        name (str, optional): The name of the person to greet. Defaults to a generic greeting if not provided.

    Returns:
        str: A friendly greeting message.
    """
    if name:
        greeting = f"Hello, {name}!"
        print(f"--- Tool: say_hello called with name: {name} ---")
    else:
        greeting = "Hello there!" # Default greeting if name is None or not explicitly passed
        print(f"--- Tool: say_hello called without a specific name (name_arg_value: {name}) ---")
    return greeting

def say_goodbye() -> str:
    """Provides a simple farewell message to conclude the conversation."""
    print(f"--- Tool: say_goodbye called ---")
    return "Goodbye! Have a great day."

print("Greeting and Farewell tools defined.")

# Optional self-test
print(say_hello("Alice"))
print(say_hello()) # Test with no argument (should use default "Hello there!")
print(say_hello(name=None)) # Test with name explicitly as None (should use default "Hello there!")
```

---

**2\. Define the Sub-Agents (Greeting & Farewell)**

Now, create the `Agent` instances for our specialists. Notice their highly focused `instruction` and, critically, their clear `description`. The `description` is the primary information the *root agent* uses to decide *when* to delegate to these sub-agents.

**Best Practice:** Sub-agent `description` fields should accurately and concisely summarize their specific capability. This is crucial for effective automatic delegation.

**Best Practice:** Sub-agent `instruction` fields should be tailored to their limited scope, telling them exactly what to do and *what not* to do (e.g., "Your *only* task is...").


```python
# @title Define Greeting and Farewell Sub-Agents

# If you want to use models other than Gemini, Ensure LiteLlm is imported and API keys are set (from Step 0/2)
# from google.adk.models.lite_llm import LiteLlm
# MODEL_GPT_4O, MODEL_CLAUDE_SONNET etc. should be defined
# Or else, continue to use: model = MODEL_GEMINI_2_0_FLASH

# --- Greeting Agent ---
greeting_agent = None
try:
    greeting_agent = Agent(
        # Using a potentially different/cheaper model for a simple task
        model = MODEL_GEMINI_2_0_FLASH,
        # model=LiteLlm(model=MODEL_GPT_4O), # If you would like to experiment with other models
        name="greeting_agent",
        instruction="You are the Greeting Agent. Your ONLY task is to provide a friendly greeting to the user. "
                    "Use the 'say_hello' tool to generate the greeting. "
                    "If the user provides their name, make sure to pass it to the tool. "
                    "Do not engage in any other conversation or tasks.",
        description="Handles simple greetings and hellos using the 'say_hello' tool.", # Crucial for delegation
        tools=[say_hello],
    )
    print(f"✅ Agent '{greeting_agent.name}' created using model '{greeting_agent.model}'.")
except Exception as e:
    print(f"❌ Could not create Greeting agent. Check API Key ({greeting_agent.model}). Error: {e}")

# --- Farewell Agent ---
farewell_agent = None
try:
    farewell_agent = Agent(
        # Can use the same or a different model
        model = MODEL_GEMINI_2_0_FLASH,
        # model=LiteLlm(model=MODEL_GPT_4O), # If you would like to experiment with other models
        name="farewell_agent",
        instruction="You are the Farewell Agent. Your ONLY task is to provide a polite goodbye message. "
                    "Use the 'say_goodbye' tool when the user indicates they are leaving or ending the conversation "
                    "(e.g., using words like 'bye', 'goodbye', 'thanks bye', 'see you'). "
                    "Do not perform any other actions.",
        description="Handles simple farewells and goodbyes using the 'say_goodbye' tool.", # Crucial for delegation
        tools=[say_goodbye],
    )
    print(f"✅ Agent '{farewell_agent.name}' created using model '{farewell_agent.model}'.")
except Exception as e:
    print(f"❌ Could not create Farewell agent. Check API Key ({farewell_agent.model}). Error: {e}")
```

---

**3\. Define the Root Agent (Weather Agent v2) with Sub-Agents**

Now, we upgrade our `weather_agent`. The key changes are:

* Adding the `sub_agents` parameter: We pass a list containing the `greeting_agent` and `farewell_agent` instances we just created.  
* Updating the `instruction`: We explicitly tell the root agent *about* its sub-agents and *when* it should delegate tasks to them.

**Key Concept: Automatic Delegation (Auto Flow)** By providing the `sub_agents` list, ADK enables automatic delegation. When the root agent receives a user query, its LLM considers not only its own instructions and tools but also the `description` of each sub-agent. If the LLM determines that a query aligns better with a sub-agent's described capability (e.g., "Handles simple greetings"), it will automatically generate a special internal action to *transfer control* to that sub-agent for that turn. The sub-agent then processes the query using its own model, instructions, and tools.

**Best Practice:** Ensure the root agent's instructions clearly guide its delegation decisions. Mention the sub-agents by name and describe the conditions under which delegation should occur.


```python
# @title Define the Root Agent with Sub-Agents

# Ensure sub-agents were created successfully before defining the root agent.
# Also ensure the original 'get_weather' tool is defined.
root_agent = None
runner_root = None # Initialize runner

if greeting_agent and farewell_agent and 'get_weather' in globals():
    # Let's use a capable Gemini model for the root agent to handle orchestration
    root_agent_model = MODEL_GEMINI_2_0_FLASH

    weather_agent_team = Agent(
        name="weather_agent_v2", # Give it a new version name
        model=root_agent_model,
        description="The main coordinator agent. Handles weather requests and delegates greetings/farewells to specialists.",
        instruction="You are the main Weather Agent coordinating a team. Your primary responsibility is to provide weather information. "
                    "Use the 'get_weather' tool ONLY for specific weather requests (e.g., 'weather in London'). "
                    "You have specialized sub-agents: "
                    "1. 'greeting_agent': Handles simple greetings like 'Hi', 'Hello'. Delegate to it for these. "
                    "2. 'farewell_agent': Handles simple farewells like 'Bye', 'See you'. Delegate to it for these. "
                    "Analyze the user's query. If it's a greeting, delegate to 'greeting_agent'. If it's a farewell, delegate to 'farewell_agent'. "
                    "If it's a weather request, handle it yourself using 'get_weather'. "
                    "For anything else, respond appropriately or state you cannot handle it.",
        tools=[get_weather], # Root agent still needs the weather tool for its core task
        # Key change: Link the sub-agents here!
        sub_agents=[greeting_agent, farewell_agent]
    )
    print(f"✅ Root Agent '{weather_agent_team.name}' created using model '{root_agent_model}' with sub-agents: {[sa.name for sa in weather_agent_team.sub_agents]}")

else:
    print("❌ Cannot create root agent because one or more sub-agents failed to initialize or 'get_weather' tool is missing.")
    if not greeting_agent: print(" - Greeting Agent is missing.")
    if not farewell_agent: print(" - Farewell Agent is missing.")
    if 'get_weather' not in globals(): print(" - get_weather function is missing.")


```

---

**4\. Interact with the Agent Team**

Now that we've defined our root agent (`weather_agent_team` - *Note: Ensure this variable name matches the one defined in the previous code block, likely `# @title Define the Root Agent with Sub-Agents`, which might have named it `root_agent`*) with its specialized sub-agents, let's test the delegation mechanism.

The following code block will:

1.  Define an `async` function `run_team_conversation`.
2.  Inside this function, create a *new, dedicated* `InMemorySessionService` and a specific session (`session_001_agent_team`) just for this test run. This isolates the conversation history for testing the team dynamics.
3.  Create a `Runner` (`runner_agent_team`) configured to use our `weather_agent_team` (the root agent) and the dedicated session service.
4.  Use our updated `call_agent_async` function to send different types of queries (greeting, weather request, farewell) to the `runner_agent_team`. We explicitly pass the runner, user ID, and session ID for this specific test.
5.  Immediately execute the `run_team_conversation` function.

We expect the following flow:

1.  The "Hello there!" query goes to `runner_agent_team`.
2.  The root agent (`weather_agent_team`) receives it and, based on its instructions and the `greeting_agent`'s description, delegates the task.
3.  `greeting_agent` handles the query, calls its `say_hello` tool, and generates the response.
4.  The "What is the weather in New York?" query is *not* delegated and is handled directly by the root agent using its `get_weather` tool.
5.  The "Thanks, bye!" query is delegated to the `farewell_agent`, which uses its `say_goodbye` tool.




```python
# @title Interact with the Agent Team
import asyncio # Ensure asyncio is imported

# Ensure the root agent (e.g., 'weather_agent_team' or 'root_agent' from the previous cell) is defined.
# Ensure the call_agent_async function is defined.

# Check if the root agent variable exists before defining the conversation function
root_agent_var_name = 'root_agent' # Default name from Step 3 guide
if 'weather_agent_team' in globals(): # Check if user used this name instead
    root_agent_var_name = 'weather_agent_team'
elif 'root_agent' not in globals():
    print("⚠️ Root agent ('root_agent' or 'weather_agent_team') not found. Cannot define run_team_conversation.")
    # Assign a dummy value to prevent NameError later if the code block runs anyway
    root_agent = None # Or set a flag to prevent execution

# Only define and run if the root agent exists
if root_agent_var_name in globals() and globals()[root_agent_var_name]:
    # Define the main async function for the conversation logic.
    # The 'await' keywords INSIDE this function are necessary for async operations.
    async def run_team_conversation():
        print("\n--- Testing Agent Team Delegation ---")
        session_service = InMemorySessionService()
        APP_NAME = "weather_tutorial_agent_team"
        USER_ID = "user_1_agent_team"
        SESSION_ID = "session_001_agent_team"
        session = await session_service.create_session(
            app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
        )
        print(f"Session created: App='{APP_NAME}', User='{USER_ID}', Session='{SESSION_ID}'")

        actual_root_agent = globals()[root_agent_var_name]
        runner_agent_team = Runner( # Or use InMemoryRunner
            agent=actual_root_agent,
            app_name=APP_NAME,
            session_service=session_service
        )
        print(f"Runner created for agent '{actual_root_agent.name}'.")

        # --- Interactions using await (correct within async def) ---
        await call_agent_async(query = "Hello there!",
                               runner=runner_agent_team,
                               user_id=USER_ID,
                               session_id=SESSION_ID)
        await call_agent_async(query = "What is the weather in New York?",
                               runner=runner_agent_team,
                               user_id=USER_ID,
                               session_id=SESSION_ID)
        await call_agent_async(query = "Thanks, bye!",
                               runner=runner_agent_team,
                               user_id=USER_ID,
                               session_id=SESSION_ID)

    # --- Execute the `run_team_conversation` async function ---
    # Choose ONE of the methods below based on your environment.
    # Note: This may require API keys for the models used!

    # METHOD 1: Direct await (Default for Notebooks/Async REPLs)
    # If your environment supports top-level await (like Colab/Jupyter notebooks),
    # it means an event loop is already running, so you can directly await the function.
    print("Attempting execution using 'await' (default for notebooks)...")
    await run_team_conversation()

    # METHOD 2: asyncio.run (For Standard Python Scripts [.py])
    # If running this code as a standard Python script from your terminal,
    # the script context is synchronous. `asyncio.run()` is needed to
    # create and manage an event loop to execute your async function.
    # To use this method:
    # 1. Comment out the `await run_team_conversation()` line above.
    # 2. Uncomment the following block:
    """
    import asyncio
    if __name__ == "__main__": # Ensures this runs only when script is executed directly
        print("Executing using 'asyncio.run()' (for standard Python scripts)...")
        try:
            # This creates an event loop, runs your async function, and closes the loop.
            asyncio.run(run_team_conversation())
        except Exception as e:
            print(f"An error occurred: {e}")
    """

else:
    # This message prints if the root agent variable wasn't found earlier
    print("\n⚠️ Skipping agent team conversation execution as the root agent was not successfully defined in a previous step.")
```

---

Look closely at the output logs, especially the `--- Tool: ... called ---` messages. You should observe:

*   For "Hello there!", the `say_hello` tool was called (indicating `greeting_agent` handled it).
*   For "What is the weather in New York?", the `get_weather` tool was called (indicating the root agent handled it).
*   For "Thanks, bye!", the `say_goodbye` tool was called (indicating `farewell_agent` handled it).

This confirms successful **automatic delegation**! The root agent, guided by its instructions and the `description`s of its `sub_agents`, correctly routed user requests to the appropriate specialist agent within the team.

You've now structured your application with multiple collaborating agents. This modular design is fundamental for building more complex and capable agent systems. In the next step, we'll give our agents the ability to remember information across turns using session state.

## Step 4: Adding Memory and Personalization with Session State

So far, our agent team can handle different tasks through delegation, but each interaction starts fresh – the agents have no memory of past conversations or user preferences within a session. To create more sophisticated and context-aware experiences, agents need **memory**. ADK provides this through **Session State**.

**What is Session State?**

* It's a Python dictionary (`session.state`) tied to a specific user session (identified by `APP_NAME`, `USER_ID`, `SESSION_ID`).  
* It persists information *across multiple conversational turns* within that session.  
* Agents and Tools can read from and write to this state, allowing them to remember details, adapt behavior, and personalize responses.

**How Agents Interact with State:**

1. **`ToolContext` (Primary Method):** Tools can accept a `ToolContext` object (automatically provided by ADK if declared as the last argument). This object gives direct access to the session state via `tool_context.state`, allowing tools to read preferences or save results *during* execution.  
2. **`output_key` (Auto-Save Agent Response):** An `Agent` can be configured with an `output_key="your_key"`. ADK will then automatically save the agent's final textual response for a turn into `session.state["your_key"]`.

**In this step, we will enhance our Weather Bot team by:**

1. Using a **new** `InMemorySessionService` to demonstrate state in isolation.  
2. Initializing session state with a user preference for `temperature_unit`.  
3. Creating a state-aware version of the weather tool (`get_weather_stateful`) that reads this preference via `ToolContext` and adjusts its output format (Celsius/Fahrenheit).  
4. Updating the root agent to use this stateful tool and configuring it with an `output_key` to automatically save its final weather report to the session state.  
5. Running a conversation to observe how the initial state affects the tool, how manual state changes alter subsequent behavior, and how `output_key` persists the agent's response.

---

**1\. Initialize New Session Service and State**

To clearly demonstrate state management without interference from prior steps, we'll instantiate a new `InMemorySessionService`. We'll also create a session with an initial state defining the user's preferred temperature unit.


```python
# @title 1. Initialize New Session Service and State

# Import necessary session components
from google.adk.sessions import InMemorySessionService

# Create a NEW session service instance for this state demonstration
session_service_stateful = InMemorySessionService()
print("✅ New InMemorySessionService created for state demonstration.")

# Define a NEW session ID for this part of the tutorial
SESSION_ID_STATEFUL = "session_state_demo_001"
USER_ID_STATEFUL = "user_state_demo"

# Define initial state data - user prefers Celsius initially
initial_state = {
    "user_preference_temperature_unit": "Celsius"
}

# Create the session, providing the initial state
session_stateful = await session_service_stateful.create_session(
    app_name=APP_NAME, # Use the consistent app name
    user_id=USER_ID_STATEFUL,
    session_id=SESSION_ID_STATEFUL,
    state=initial_state # <<< Initialize state during creation
)
print(f"✅ Session '{SESSION_ID_STATEFUL}' created for user '{USER_ID_STATEFUL}'.")

# Verify the initial state was set correctly
retrieved_session = await session_service_stateful.get_session(app_name=APP_NAME,
                                                         user_id=USER_ID_STATEFUL,
                                                         session_id = SESSION_ID_STATEFUL)
print("\n--- Initial Session State ---")
if retrieved_session:
    print(retrieved_session.state)
else:
    print("Error: Could not retrieve session.")
```

---

**2\. Create State-Aware Weather Tool (`get_weather_stateful`)**

Now, we create a new version of the weather tool. Its key feature is accepting `tool_context: ToolContext` which allows it to access `tool_context.state`. It will read the `user_preference_temperature_unit` and format the temperature accordingly.


* **Key Concept: `ToolContext`** This object is the bridge allowing your tool logic to interact with the session's context, including reading and writing state variables. ADK injects it automatically if defined as the last parameter of your tool function.


* **Best Practice:** When reading from state, use `dictionary.get('key', default_value)` to handle cases where the key might not exist yet, ensuring your tool doesn't crash.


```python
from google.adk.tools.tool_context import ToolContext

def get_weather_stateful(city: str, tool_context: ToolContext) -> dict:
    """Retrieves weather, converts temp unit based on session state."""
    print(f"--- Tool: get_weather_stateful called for {city} ---")

    # --- Read preference from state ---
    preferred_unit = tool_context.state.get("user_preference_temperature_unit", "Celsius") # Default to Celsius
    print(f"--- Tool: Reading state 'user_preference_temperature_unit': {preferred_unit} ---")

    city_normalized = city.lower().replace(" ", "")

    # Mock weather data (always stored in Celsius internally)
    mock_weather_db = {
        "newyork": {"temp_c": 25, "condition": "sunny"},
        "london": {"temp_c": 15, "condition": "cloudy"},
        "tokyo": {"temp_c": 18, "condition": "light rain"},
    }

    if city_normalized in mock_weather_db:
        data = mock_weather_db[city_normalized]
        temp_c = data["temp_c"]
        condition = data["condition"]

        # Format temperature based on state preference
        if preferred_unit == "Fahrenheit":
            temp_value = (temp_c * 9/5) + 32 # Calculate Fahrenheit
            temp_unit = "°F"
        else: # Default to Celsius
            temp_value = temp_c
            temp_unit = "°C"

        report = f"The weather in {city.capitalize()} is {condition} with a temperature of {temp_value:.0f}{temp_unit}."
        result = {"status": "success", "report": report}
        print(f"--- Tool: Generated report in {preferred_unit}. Result: {result} ---")

        # Example of writing back to state (optional for this tool)
        tool_context.state["last_city_checked_stateful"] = city
        print(f"--- Tool: Updated state 'last_city_checked_stateful': {city} ---")

        return result
    else:
        # Handle city not found
        error_msg = f"Sorry, I don't have weather information for '{city}'."
        print(f"--- Tool: City '{city}' not found. ---")
        return {"status": "error", "error_message": error_msg}

print("✅ State-aware 'get_weather_stateful' tool defined.")

```

---

**3\. Redefine Sub-Agents and Update Root Agent**

To ensure this step is self-contained and builds correctly, we first redefine the `greeting_agent` and `farewell_agent` exactly as they were in Step 3\. Then, we define our new root agent (`weather_agent_v4_stateful`):

* It uses the new `get_weather_stateful` tool.  
* It includes the greeting and farewell sub-agents for delegation.  
* **Crucially**, it sets `output_key="last_weather_report"` which automatically saves its final weather response to the session state.


```python
# @title 3. Redefine Sub-Agents and Update Root Agent with output_key

# Ensure necessary imports: Agent, LiteLlm, Runner
from google.adk.agents import Agent
from google.adk.models.lite_llm import LiteLlm
from google.adk.runners import Runner
# Ensure tools 'say_hello', 'say_goodbye' are defined (from Step 3)
# Ensure model constants MODEL_GPT_4O, MODEL_GEMINI_2_0_FLASH etc. are defined

# --- Redefine Greeting Agent (from Step 3) ---
greeting_agent = None
try:
    greeting_agent = Agent(
        model=MODEL_GEMINI_2_0_FLASH,
        name="greeting_agent",
        instruction="You are the Greeting Agent. Your ONLY task is to provide a friendly greeting using the 'say_hello' tool. Do nothing else.",
        description="Handles simple greetings and hellos using the 'say_hello' tool.",
        tools=[say_hello],
    )
    print(f"✅ Agent '{greeting_agent.name}' redefined.")
except Exception as e:
    print(f"❌ Could not redefine Greeting agent. Error: {e}")

# --- Redefine Farewell Agent (from Step 3) ---
farewell_agent = None
try:
    farewell_agent = Agent(
        model=MODEL_GEMINI_2_0_FLASH,
        name="farewell_agent",
        instruction="You are the Farewell Agent. Your ONLY task is to provide a polite goodbye message using the 'say_goodbye' tool. Do not perform any other actions.",
        description="Handles simple farewells and goodbyes using the 'say_goodbye' tool.",
        tools=[say_goodbye],
    )
    print(f"✅ Agent '{farewell_agent.name}' redefined.")
except Exception as e:
    print(f"❌ Could not redefine Farewell agent. Error: {e}")

# --- Define the Updated Root Agent ---
root_agent_stateful = None
runner_root_stateful = None # Initialize runner

# Check prerequisites before creating the root agent
if greeting_agent and farewell_agent and 'get_weather_stateful' in globals():

    root_agent_model = MODEL_GEMINI_2_0_FLASH # Choose orchestration model

    root_agent_stateful = Agent(
        name="weather_agent_v4_stateful", # New version name
        model=root_agent_model,
        description="Main agent: Provides weather (state-aware unit), delegates greetings/farewells, saves report to state.",
        instruction="You are the main Weather Agent. Your job is to provide weather using 'get_weather_stateful'. "
                    "The tool will format the temperature based on user preference stored in state. "
                    "Delegate simple greetings to 'greeting_agent' and farewells to 'farewell_agent'. "
                    "Handle only weather requests, greetings, and farewells.",
        tools=[get_weather_stateful], # Use the state-aware tool
        sub_agents=[greeting_agent, farewell_agent], # Include sub-agents
        output_key="last_weather_report" # <<< Auto-save agent's final weather response
    )
    print(f"✅ Root Agent '{root_agent_stateful.name}' created using stateful tool and output_key.")

    # --- Create Runner for this Root Agent & NEW Session Service ---
    runner_root_stateful = Runner(
        agent=root_agent_stateful,
        app_name=APP_NAME,
        session_service=session_service_stateful # Use the NEW stateful session service
    )
    print(f"✅ Runner created for stateful root agent '{runner_root_stateful.agent.name}' using stateful session service.")

else:
    print("❌ Cannot create stateful root agent. Prerequisites missing.")
    if not greeting_agent: print(" - greeting_agent definition missing.")
    if not farewell_agent: print(" - farewell_agent definition missing.")
    if 'get_weather_stateful' not in globals(): print(" - get_weather_stateful tool missing.")

```

---

**4\. Interact and Test State Flow**

Now, let's execute a conversation designed to test the state interactions using the `runner_root_stateful` (associated with our stateful agent and the `session_service_stateful`). We'll use the `call_agent_async` function defined earlier, ensuring we pass the correct runner, user ID (`USER_ID_STATEFUL`), and session ID (`SESSION_ID_STATEFUL`).

The conversation flow will be:

1.  **Check weather (London):** The `get_weather_stateful` tool should read the initial "Celsius" preference from the session state initialized in Section 1. The root agent's final response (the weather report in Celsius) should get saved to `state['last_weather_report']` via the `output_key` configuration.
2.  **Manually update state:** We will *directly modify* the state stored within the `InMemorySessionService` instance (`session_service_stateful`).
    *   **Why direct modification?** The `session_service.get_session()` method returns a *copy* of the session. Modifying that copy wouldn't affect the state used in subsequent agent runs. For this testing scenario with `InMemorySessionService`, we access the internal `sessions` dictionary to change the *actual* stored state value for `user_preference_temperature_unit` to "Fahrenheit". *Note: In real applications, state changes are typically triggered by tools or agent logic returning `EventActions(state_delta=...)`, not direct manual updates.*
3.  **Check weather again (New York):** The `get_weather_stateful` tool should now read the updated "Fahrenheit" preference from the state and convert the temperature accordingly. The root agent's *new* response (weather in Fahrenheit) will overwrite the previous value in `state['last_weather_report']` due to the `output_key`.
4.  **Greet the agent:** Verify that delegation to the `greeting_agent` still works correctly alongside the stateful operations. This interaction will become the *last* response saved by `output_key` in this specific sequence.
5.  **Inspect final state:** After the conversation, we retrieve the session one last time (getting a copy) and print its state to confirm the `user_preference_temperature_unit` is indeed "Fahrenheit", observe the final value saved by `output_key` (which will be the greeting in this run), and see the `last_city_checked_stateful` value written by the tool.



```python
# @title 4. Interact to Test State Flow and output_key
import asyncio # Ensure asyncio is imported

# Ensure the stateful runner (runner_root_stateful) is available from the previous cell
# Ensure call_agent_async, USER_ID_STATEFUL, SESSION_ID_STATEFUL, APP_NAME are defined

if 'runner_root_stateful' in globals() and runner_root_stateful:
    # Define the main async function for the stateful conversation logic.
    # The 'await' keywords INSIDE this function are necessary for async operations.
    async def run_stateful_conversation():
        print("\n--- Testing State: Temp Unit Conversion & output_key ---")

        # 1. Check weather (Uses initial state: Celsius)
        print("--- Turn 1: Requesting weather in London (expect Celsius) ---")
        await call_agent_async(query= "What's the weather in London?",
                               runner=runner_root_stateful,
                               user_id=USER_ID_STATEFUL,
                               session_id=SESSION_ID_STATEFUL
                              )

        # 2. Manually update state preference to Fahrenheit - DIRECTLY MODIFY STORAGE
        print("\n--- Manually Updating State: Setting unit to Fahrenheit ---")
        try:
            # Access the internal storage directly - THIS IS SPECIFIC TO InMemorySessionService for testing
            # NOTE: In production with persistent services (Database, VertexAI), you would
            # typically update state via agent actions or specific service APIs if available,
            # not by direct manipulation of internal storage.
            stored_session = session_service_stateful.sessions[APP_NAME][USER_ID_STATEFUL][SESSION_ID_STATEFUL]
            stored_session.state["user_preference_temperature_unit"] = "Fahrenheit"
            # Optional: You might want to update the timestamp as well if any logic depends on it
            # import time
            # stored_session.last_update_time = time.time()
            print(f"--- Stored session state updated. Current 'user_preference_temperature_unit': {stored_session.state.get('user_preference_temperature_unit', 'Not Set')} ---") # Added .get for safety
        except KeyError:
            print(f"--- Error: Could not retrieve session '{SESSION_ID_STATEFUL}' from internal storage for user '{USER_ID_STATEFUL}' in app '{APP_NAME}' to update state. Check IDs and if session was created. ---")
        except Exception as e:
             print(f"--- Error updating internal session state: {e} ---")

        # 3. Check weather again (Tool should now use Fahrenheit)
        # This will also update 'last_weather_report' via output_key
        print("\n--- Turn 2: Requesting weather in New York (expect Fahrenheit) ---")
        await call_agent_async(query= "Tell me the weather in New York.",
                               runner=runner_root_stateful,
                               user_id=USER_ID_STATEFUL,
                               session_id=SESSION_ID_STATEFUL
                              )

        # 4. Test basic delegation (should still work)
        # This will update 'last_weather_report' again, overwriting the NY weather report
        print("\n--- Turn 3: Sending a greeting ---")
        await call_agent_async(query= "Hi!",
                               runner=runner_root_stateful,
                               user_id=USER_ID_STATEFUL,
                               session_id=SESSION_ID_STATEFUL
                              )

    # --- Execute the `run_stateful_conversation` async function ---
    # Choose ONE of the methods below based on your environment.

    # METHOD 1: Direct await (Default for Notebooks/Async REPLs)
    # If your environment supports top-level await (like Colab/Jupyter notebooks),
    # it means an event loop is already running, so you can directly await the function.
    print("Attempting execution using 'await' (default for notebooks)...")
    await run_stateful_conversation()

    # METHOD 2: asyncio.run (For Standard Python Scripts [.py])
    # If running this code as a standard Python script from your terminal,
    # the script context is synchronous. `asyncio.run()` is needed to
    # create and manage an event loop to execute your async function.
    # To use this method:
    # 1. Comment out the `await run_stateful_conversation()` line above.
    # 2. Uncomment the following block:
    """
    import asyncio
    if __name__ == "__main__": # Ensures this runs only when script is executed directly
        print("Executing using 'asyncio.run()' (for standard Python scripts)...")
        try:
            # This creates an event loop, runs your async function, and closes the loop.
            asyncio.run(run_stateful_conversation())
        except Exception as e:
            print(f"An error occurred: {e}")
    """

    # --- Inspect final session state after the conversation ---
    # This block runs after either execution method completes.
    print("\n--- Inspecting Final Session State ---")
    final_session = await session_service_stateful.get_session(app_name=APP_NAME,
                                                         user_id= USER_ID_STATEFUL,
                                                         session_id=SESSION_ID_STATEFUL)
    if final_session:
        # Use .get() for safer access to potentially missing keys
        print(f"Final Preference: {final_session.state.get('user_preference_temperature_unit', 'Not Set')}")
        print(f"Final Last Weather Report (from output_key): {final_session.state.get('last_weather_report', 'Not Set')}")
        print(f"Final Last City Checked (by tool): {final_session.state.get('last_city_checked_stateful', 'Not Set')}")
        # Print full state for detailed view
        # print(f"Full State Dict: {final_session.state}") # For detailed view
    else:
        print("\n❌ Error: Could not retrieve final session state.")

else:
    print("\n⚠️ Skipping state test conversation. Stateful root agent runner ('runner_root_stateful') is not available.")
```

---

By reviewing the conversation flow and the final session state printout, you can confirm:

*   **State Read:** The weather tool (`get_weather_stateful`) correctly read `user_preference_temperature_unit` from state, initially using "Celsius" for London.
*   **State Update:** The direct modification successfully changed the stored preference to "Fahrenheit".
*   **State Read (Updated):** The tool subsequently read "Fahrenheit" when asked for New York's weather and performed the conversion.
*   **Tool State Write:** The tool successfully wrote the `last_city_checked_stateful` ("New York" after the second weather check) into the state via `tool_context.state`.
*   **Delegation:** The delegation to the `greeting_agent` for "Hi!" functioned correctly even after state modifications.
*   **`output_key`:** The `output_key="last_weather_report"` successfully saved the root agent's *final* response for *each turn* where the root agent was the one ultimately responding. In this sequence, the last response was the greeting ("Hello, there!"), so that overwrote the weather report in the state key.
*   **Final State:** The final check confirms the preference persisted as "Fahrenheit".

You've now successfully integrated session state to personalize agent behavior using `ToolContext`, manually manipulated state for testing `InMemorySessionService`, and observed how `output_key` provides a simple mechanism for saving the agent's last response to state. This foundational understanding of state management is key as we proceed to implement safety guardrails using callbacks in the next steps.

---

## Step 5: Adding Safety \- Input Guardrail with `before_model_callback`

Our agent team is becoming more capable, remembering preferences and using tools effectively. However, in real-world scenarios, we often need safety mechanisms to control the agent's behavior *before* potentially problematic requests even reach the core Large Language Model (LLM).

ADK provides **Callbacks** – functions that allow you to hook into specific points in the agent's execution lifecycle. The `before_model_callback` is particularly useful for input safety.

**What is `before_model_callback`?**

* It's a Python function you define that ADK executes *just before* an agent sends its compiled request (including conversation history, instructions, and the latest user message) to the underlying LLM.  
* **Purpose:** Inspect the request, modify it if necessary, or block it entirely based on predefined rules.

**Common Use Cases:**

* **Input Validation/Filtering:** Check if user input meets criteria or contains disallowed content (like PII or keywords).  
* **Guardrails:** Prevent harmful, off-topic, or policy-violating requests from being processed by the LLM.  
* **Dynamic Prompt Modification:** Add timely information (e.g., from session state) to the LLM request context just before sending.

**How it Works:**

1. Define a function accepting `callback_context: CallbackContext` and `llm_request: LlmRequest`.  

    * `callback_context`: Provides access to agent info, session state (`callback_context.state`), etc.  
    * `llm_request`: Contains the full payload intended for the LLM (`contents`, `config`).  

2. Inside the function: 

    * **Inspect:** Examine `llm_request.contents` (especially the last user message).  
    * **Modify (Use Caution):** You *can* change parts of `llm_request`.  
    * **Block (Guardrail):** Return an `LlmResponse` object. ADK will send this response back immediately, *skipping* the LLM call for that turn.  
    * **Allow:** Return `None`. ADK proceeds to call the LLM with the (potentially modified) request.

**In this step, we will:**

1. Define a `before_model_callback` function (`block_keyword_guardrail`) that checks the user's input for a specific keyword ("BLOCK").  
2. Update our stateful root agent (`weather_agent_v4_stateful` from Step 4\) to use this callback.  
3. Create a new runner associated with this updated agent but using the *same stateful session service* to maintain state continuity.  
4. Test the guardrail by sending both normal and keyword-containing requests.

---

**1\. Define the Guardrail Callback Function**

This function will inspect the last user message within the `llm_request` content. If it finds "BLOCK" (case-insensitive), it constructs and returns an `LlmResponse` to block the flow; otherwise, it returns `None`.  


```python
# @title 1. Define the before_model_callback Guardrail

# Ensure necessary imports are available
from google.adk.agents.callback_context import CallbackContext
from google.adk.models.llm_request import LlmRequest
from google.adk.models.llm_response import LlmResponse
from google.genai import types # For creating response content
from typing import Optional

def block_keyword_guardrail(
    callback_context: CallbackContext, llm_request: LlmRequest
) -> Optional[LlmResponse]:
    """
    Inspects the latest user message for 'BLOCK'. If found, blocks the LLM call
    and returns a predefined LlmResponse. Otherwise, returns None to proceed.
    """
    agent_name = callback_context.agent_name # Get the name of the agent whose model call is being intercepted
    print(f"--- Callback: block_keyword_guardrail running for agent: {agent_name} ---")

    # Extract the text from the latest user message in the request history
    last_user_message_text = ""
    if llm_request.contents:
        # Find the most recent message with role 'user'
        for content in reversed(llm_request.contents):
            if content.role == 'user' and content.parts:
                # Assuming text is in the first part for simplicity
                if content.parts[0].text:
                    last_user_message_text = content.parts[0].text
                    break # Found the last user message text

    print(f"--- Callback: Inspecting last user message: '{last_user_message_text[:100]}...' ---") # Log first 100 chars

    # --- Guardrail Logic ---
    keyword_to_block = "BLOCK"
    if keyword_to_block in last_user_message_text.upper(): # Case-insensitive check
        print(f"--- Callback: Found '{keyword_to_block}'. Blocking LLM call! ---")
        # Optionally, set a flag in state to record the block event
        callback_context.state["guardrail_block_keyword_triggered"] = True
        print(f"--- Callback: Set state 'guardrail_block_keyword_triggered': True ---")

        # Construct and return an LlmResponse to stop the flow and send this back instead
        return LlmResponse(
            content=types.Content(
                role="model", # Mimic a response from the agent's perspective
                parts=[types.Part(text=f"I cannot process this request because it contains the blocked keyword '{keyword_to_block}'.")],
            )
            # Note: You could also set an error_message field here if needed
        )
    else:
        # Keyword not found, allow the request to proceed to the LLM
        print(f"--- Callback: Keyword not found. Allowing LLM call for {agent_name}. ---")
        return None # Returning None signals ADK to continue normally

print("✅ block_keyword_guardrail function defined.")

```

---

**2\. Update Root Agent to Use the Callback**

We redefine the root agent, adding the `before_model_callback` parameter and pointing it to our new guardrail function. We'll give it a new version name for clarity.

*Important:* We need to redefine the sub-agents (`greeting_agent`, `farewell_agent`) and the stateful tool (`get_weather_stateful`) within this context if they are not already available from previous steps, ensuring the root agent definition has access to all its components.


```python
# @title 2. Update Root Agent with before_model_callback


# --- Redefine Sub-Agents (Ensures they exist in this context) ---
greeting_agent = None
try:
    # Use a defined model constant
    greeting_agent = Agent(
        model=MODEL_GEMINI_2_0_FLASH,
        name="greeting_agent", # Keep original name for consistency
        instruction="You are the Greeting Agent. Your ONLY task is to provide a friendly greeting using the 'say_hello' tool. Do nothing else.",
        description="Handles simple greetings and hellos using the 'say_hello' tool.",
        tools=[say_hello],
    )
    print(f"✅ Sub-Agent '{greeting_agent.name}' redefined.")
except Exception as e:
    print(f"❌ Could not redefine Greeting agent. Check Model/API Key ({greeting_agent.model}). Error: {e}")

farewell_agent = None
try:
    # Use a defined model constant
    farewell_agent = Agent(
        model=MODEL_GEMINI_2_0_FLASH,
        name="farewell_agent", # Keep original name
        instruction="You are the Farewell Agent. Your ONLY task is to provide a polite goodbye message using the 'say_goodbye' tool. Do not perform any other actions.",
        description="Handles simple farewells and goodbyes using the 'say_goodbye' tool.",
        tools=[say_goodbye],
    )
    print(f"✅ Sub-Agent '{farewell_agent.name}' redefined.")
except Exception as e:
    print(f"❌ Could not redefine Farewell agent. Check Model/API Key ({farewell_agent.model}). Error: {e}")


# --- Define the Root Agent with the Callback ---
root_agent_model_guardrail = None
runner_root_model_guardrail = None

# Check all components before proceeding
if greeting_agent and farewell_agent and 'get_weather_stateful' in globals() and 'block_keyword_guardrail' in globals():

    # Use a defined model constant
    root_agent_model = MODEL_GEMINI_2_0_FLASH

    root_agent_model_guardrail = Agent(
        name="weather_agent_v5_model_guardrail", # New version name for clarity
        model=root_agent_model,
        description="Main agent: Handles weather, delegates greetings/farewells, includes input keyword guardrail.",
        instruction="You are the main Weather Agent. Provide weather using 'get_weather_stateful'. "
                    "Delegate simple greetings to 'greeting_agent' and farewells to 'farewell_agent'. "
                    "Handle only weather requests, greetings, and farewells.",
        tools=[get_weather],
        sub_agents=[greeting_agent, farewell_agent], # Reference the redefined sub-agents
        output_key="last_weather_report", # Keep output_key from Step 4
        before_model_callback=block_keyword_guardrail # <<< Assign the guardrail callback
    )
    print(f"✅ Root Agent '{root_agent_model_guardrail.name}' created with before_model_callback.")

    # --- Create Runner for this Agent, Using SAME Stateful Session Service ---
    # Ensure session_service_stateful exists from Step 4
    if 'session_service_stateful' in globals():
        runner_root_model_guardrail = Runner(
            agent=root_agent_model_guardrail,
            app_name=APP_NAME, # Use consistent APP_NAME
            session_service=session_service_stateful # <<< Use the service from Step 4
        )
        print(f"✅ Runner created for guardrail agent '{runner_root_model_guardrail.agent.name}', using stateful session service.")
    else:
        print("❌ Cannot create runner. 'session_service_stateful' from Step 4 is missing.")

else:
    print("❌ Cannot create root agent with model guardrail. One or more prerequisites are missing or failed initialization:")
    if not greeting_agent: print("   - Greeting Agent")
    if not farewell_agent: print("   - Farewell Agent")
    if 'get_weather_stateful' not in globals(): print("   - 'get_weather_stateful' tool")
    if 'block_keyword_guardrail' not in globals(): print("   - 'block_keyword_guardrail' callback")
```

---

**3\. Interact to Test the Guardrail**

Let's test the guardrail's behavior. We'll use the *same session* (`SESSION_ID_STATEFUL`) as in Step 4 to show that state persists across these changes.

1. Send a normal weather request (should pass the guardrail and execute).  
2. Send a request containing "BLOCK" (should be intercepted by the callback).  
3. Send a greeting (should pass the root agent's guardrail, be delegated, and execute normally).


```python
# @title 3. Interact to Test the Model Input Guardrail
import asyncio # Ensure asyncio is imported

# Ensure the runner for the guardrail agent is available
if 'runner_root_model_guardrail' in globals() and runner_root_model_guardrail:
    # Define the main async function for the guardrail test conversation.
    # The 'await' keywords INSIDE this function are necessary for async operations.
    async def run_guardrail_test_conversation():
        print("\n--- Testing Model Input Guardrail ---")

        # Use the runner for the agent with the callback and the existing stateful session ID
        # Define a helper lambda for cleaner interaction calls
        interaction_func = lambda query: call_agent_async(query,
                                                         runner_root_model_guardrail,
                                                         USER_ID_STATEFUL, # Use existing user ID
                                                         SESSION_ID_STATEFUL # Use existing session ID
                                                        )
        # 1. Normal request (Callback allows, should use Fahrenheit from previous state change)
        print("--- Turn 1: Requesting weather in London (expect allowed, Fahrenheit) ---")
        await interaction_func("What is the weather in London?")

        # 2. Request containing the blocked keyword (Callback intercepts)
        print("\n--- Turn 2: Requesting with blocked keyword (expect blocked) ---")
        await interaction_func("BLOCK the request for weather in Tokyo") # Callback should catch "BLOCK"

        # 3. Normal greeting (Callback allows root agent, delegation happens)
        print("\n--- Turn 3: Sending a greeting (expect allowed) ---")
        await interaction_func("Hello again")

    # --- Execute the `run_guardrail_test_conversation` async function ---
    # Choose ONE of the methods below based on your environment.

    # METHOD 1: Direct await (Default for Notebooks/Async REPLs)
    # If your environment supports top-level await (like Colab/Jupyter notebooks),
    # it means an event loop is already running, so you can directly await the function.
    print("Attempting execution using 'await' (default for notebooks)...")
    await run_guardrail_test_conversation()

    # METHOD 2: asyncio.run (For Standard Python Scripts [.py])
    # If running this code as a standard Python script from your terminal,
    # the script context is synchronous. `asyncio.run()` is needed to
    # create and manage an event loop to execute your async function.
    # To use this method:
    # 1. Comment out the `await run_guardrail_test_conversation()` line above.
    # 2. Uncomment the following block:
    """
    import asyncio
    if __name__ == "__main__": # Ensures this runs only when script is executed directly
        print("Executing using 'asyncio.run()' (for standard Python scripts)...")
        try:
            # This creates an event loop, runs your async function, and closes the loop.
            asyncio.run(run_guardrail_test_conversation())
        except Exception as e:
            print(f"An error occurred: {e}")
    """

    # --- Inspect final session state after the conversation ---
    # This block runs after either execution method completes.
    # Optional: Check state for the trigger flag set by the callback
    print("\n--- Inspecting Final Session State (After Guardrail Test) ---")
    # Use the session service instance associated with this stateful session
    final_session = await session_service_stateful.get_session(app_name=APP_NAME,
                                                         user_id=USER_ID_STATEFUL,
                                                         session_id=SESSION_ID_STATEFUL)
    if final_session:
        # Use .get() for safer access
        print(f"Guardrail Triggered Flag: {final_session.state.get('guardrail_block_keyword_triggered', 'Not Set (or False)')}")
        print(f"Last Weather Report: {final_session.state.get('last_weather_report', 'Not Set')}") # Should be London weather if successful
        print(f"Temperature Unit: {final_session.state.get('user_preference_temperature_unit', 'Not Set')}") # Should be Fahrenheit
        # print(f"Full State Dict: {final_session.state}") # For detailed view
    else:
        print("\n❌ Error: Could not retrieve final session state.")

else:
    print("\n⚠️ Skipping model guardrail test. Runner ('runner_root_model_guardrail') is not available.")
```

---

Observe the execution flow:

1. **London Weather:** The callback runs for `weather_agent_v5_model_guardrail`, inspects the message, prints "Keyword not found. Allowing LLM call.", and returns `None`. The agent proceeds, calls the `get_weather_stateful` tool (which uses the "Fahrenheit" preference from Step 4's state change), and returns the weather. This response updates `last_weather_report` via `output_key`.  
2. **BLOCK Request:** The callback runs again for `weather_agent_v5_model_guardrail`, inspects the message, finds "BLOCK", prints "Blocking LLM call\!", sets the state flag, and returns the predefined `LlmResponse`. The agent's underlying LLM is *never called* for this turn. The user sees the callback's blocking message.  
3. **Hello Again:** The callback runs for `weather_agent_v5_model_guardrail`, allows the request. The root agent then delegates to `greeting_agent`. *Note: The `before_model_callback` defined on the root agent does NOT automatically apply to sub-agents.* The `greeting_agent` proceeds normally, calls its `say_hello` tool, and returns the greeting.

You have successfully implemented an input safety layer\! The `before_model_callback` provides a powerful mechanism to enforce rules and control agent behavior *before* expensive or potentially risky LLM calls are made. Next, we'll apply a similar concept to add guardrails around tool usage itself.

## Step 6: Adding Safety \- Tool Argument Guardrail (`before_tool_callback`)

In Step 5, we added a guardrail to inspect and potentially block user input *before* it reached the LLM. Now, we'll add another layer of control *after* the LLM has decided to use a tool but *before* that tool actually executes. This is useful for validating the *arguments* the LLM wants to pass to the tool.

ADK provides the `before_tool_callback` for this precise purpose.

**What is `before_tool_callback`?**

* It's a Python function executed just *before* a specific tool function runs, after the LLM has requested its use and decided on the arguments.  
* **Purpose:** Validate tool arguments, prevent tool execution based on specific inputs, modify arguments dynamically, or enforce resource usage policies.

**Common Use Cases:**

* **Argument Validation:** Check if arguments provided by the LLM are valid, within allowed ranges, or conform to expected formats.  
* **Resource Protection:** Prevent tools from being called with inputs that might be costly, access restricted data, or cause unwanted side effects (e.g., blocking API calls for certain parameters).  
* **Dynamic Argument Modification:** Adjust arguments based on session state or other contextual information before the tool runs.

**How it Works:**

1. Define a function accepting `tool: BaseTool`, `args: Dict[str, Any]`, and `tool_context: ToolContext`.  

    * `tool`: The tool object about to be called (inspect `tool.name`).  
    * `args`: The dictionary of arguments the LLM generated for the tool.  
    * `tool_context`: Provides access to session state (`tool_context.state`), agent info, etc.  

2. Inside the function:  

    * **Inspect:** Examine the `tool.name` and the `args` dictionary.  
    * **Modify:** Change values within the `args` dictionary *directly*. If you return `None`, the tool runs with these modified args.  
    * **Block/Override (Guardrail):** Return a **dictionary**. ADK treats this dictionary as the *result* of the tool call, completely *skipping* the execution of the original tool function. The dictionary should ideally match the expected return format of the tool it's blocking.  
    * **Allow:** Return `None`. ADK proceeds to execute the actual tool function with the (potentially modified) arguments.

**In this step, we will:**

1. Define a `before_tool_callback` function (`block_paris_tool_guardrail`) that specifically checks if the `get_weather_stateful` tool is called with the city "Paris".  
2. If "Paris" is detected, the callback will block the tool and return a custom error dictionary.  
3. Update our root agent (`weather_agent_v6_tool_guardrail`) to include *both* the `before_model_callback` and this new `before_tool_callback`.  
4. Create a new runner for this agent, using the same stateful session service.  
5. Test the flow by requesting weather for allowed cities and the blocked city ("Paris").

---

**1\. Define the Tool Guardrail Callback Function**

This function targets the `get_weather_stateful` tool. It checks the `city` argument. If it's "Paris", it returns an error dictionary that looks like the tool's own error response. Otherwise, it allows the tool to run by returning `None`.


```python
# @title 1. Define the before_tool_callback Guardrail

# Ensure necessary imports are available
from google.adk.tools.base_tool import BaseTool
from google.adk.tools.tool_context import ToolContext
from typing import Optional, Dict, Any # For type hints

def block_paris_tool_guardrail(
    tool: BaseTool, args: Dict[str, Any], tool_context: ToolContext
) -> Optional[Dict]:
    """
    Checks if 'get_weather_stateful' is called for 'Paris'.
    If so, blocks the tool execution and returns a specific error dictionary.
    Otherwise, allows the tool call to proceed by returning None.
    """
    tool_name = tool.name
    agent_name = tool_context.agent_name # Agent attempting the tool call
    print(f"--- Callback: block_paris_tool_guardrail running for tool '{tool_name}' in agent '{agent_name}' ---")
    print(f"--- Callback: Inspecting args: {args} ---")

    # --- Guardrail Logic ---
    target_tool_name = "get_weather_stateful" # Match the function name used by FunctionTool
    blocked_city = "paris"

    # Check if it's the correct tool and the city argument matches the blocked city
    if tool_name == target_tool_name:
        city_argument = args.get("city", "") # Safely get the 'city' argument
        if city_argument and city_argument.lower() == blocked_city:
            print(f"--- Callback: Detected blocked city '{city_argument}'. Blocking tool execution! ---")
            # Optionally update state
            tool_context.state["guardrail_tool_block_triggered"] = True
            print(f"--- Callback: Set state 'guardrail_tool_block_triggered': True ---")

            # Return a dictionary matching the tool's expected output format for errors
            # This dictionary becomes the tool's result, skipping the actual tool run.
            return {
                "status": "error",
                "error_message": f"Policy restriction: Weather checks for '{city_argument.capitalize()}' are currently disabled by a tool guardrail."
            }
        else:
             print(f"--- Callback: City '{city_argument}' is allowed for tool '{tool_name}'. ---")
    else:
        print(f"--- Callback: Tool '{tool_name}' is not the target tool. Allowing. ---")


    # If the checks above didn't return a dictionary, allow the tool to execute
    print(f"--- Callback: Allowing tool '{tool_name}' to proceed. ---")
    return None # Returning None allows the actual tool function to run

print("✅ block_paris_tool_guardrail function defined.")


```

---

**2\. Update Root Agent to Use Both Callbacks**

We redefine the root agent again (`weather_agent_v6_tool_guardrail`), this time adding the `before_tool_callback` parameter alongside the `before_model_callback` from Step 5\.

*Self-Contained Execution Note:* Similar to Step 5, ensure all prerequisites (sub-agents, tools, `before_model_callback`) are defined or available in the execution context before defining this agent.


```python
# @title 2. Update Root Agent with BOTH Callbacks (Self-Contained)

# --- Ensure Prerequisites are Defined ---
# (Include or ensure execution of definitions for: Agent, LiteLlm, Runner, ToolContext,
#  MODEL constants, say_hello, say_goodbye, greeting_agent, farewell_agent,
#  get_weather_stateful, block_keyword_guardrail, block_paris_tool_guardrail)

# --- Redefine Sub-Agents (Ensures they exist in this context) ---
greeting_agent = None
try:
    # Use a defined model constant
    greeting_agent = Agent(
        model=MODEL_GEMINI_2_0_FLASH,
        name="greeting_agent", # Keep original name for consistency
        instruction="You are the Greeting Agent. Your ONLY task is to provide a friendly greeting using the 'say_hello' tool. Do nothing else.",
        description="Handles simple greetings and hellos using the 'say_hello' tool.",
        tools=[say_hello],
    )
    print(f"✅ Sub-Agent '{greeting_agent.name}' redefined.")
except Exception as e:
    print(f"❌ Could not redefine Greeting agent. Check Model/API Key ({greeting_agent.model}). Error: {e}")

farewell_agent = None
try:
    # Use a defined model constant
    farewell_agent = Agent(
        model=MODEL_GEMINI_2_0_FLASH,
        name="farewell_agent", # Keep original name
        instruction="You are the Farewell Agent. Your ONLY task is to provide a polite goodbye message using the 'say_goodbye' tool. Do not perform any other actions.",
        description="Handles simple farewells and goodbyes using the 'say_goodbye' tool.",
        tools=[say_goodbye],
    )
    print(f"✅ Sub-Agent '{farewell_agent.name}' redefined.")
except Exception as e:
    print(f"❌ Could not redefine Farewell agent. Check Model/API Key ({farewell_agent.model}). Error: {e}")

# --- Define the Root Agent with Both Callbacks ---
root_agent_tool_guardrail = None
runner_root_tool_guardrail = None

if ('greeting_agent' in globals() and greeting_agent and
    'farewell_agent' in globals() and farewell_agent and
    'get_weather_stateful' in globals() and
    'block_keyword_guardrail' in globals() and
    'block_paris_tool_guardrail' in globals()):

    root_agent_model = MODEL_GEMINI_2_0_FLASH

    root_agent_tool_guardrail = Agent(
        name="weather_agent_v6_tool_guardrail", # New version name
        model=root_agent_model,
        description="Main agent: Handles weather, delegates, includes input AND tool guardrails.",
        instruction="You are the main Weather Agent. Provide weather using 'get_weather_stateful'. "
                    "Delegate greetings to 'greeting_agent' and farewells to 'farewell_agent'. "
                    "Handle only weather, greetings, and farewells.",
        tools=[get_weather_stateful],
        sub_agents=[greeting_agent, farewell_agent],
        output_key="last_weather_report",
        before_model_callback=block_keyword_guardrail, # Keep model guardrail
        before_tool_callback=block_paris_tool_guardrail # <<< Add tool guardrail
    )
    print(f"✅ Root Agent '{root_agent_tool_guardrail.name}' created with BOTH callbacks.")

    # --- Create Runner, Using SAME Stateful Session Service ---
    if 'session_service_stateful' in globals():
        runner_root_tool_guardrail = Runner(
            agent=root_agent_tool_guardrail,
            app_name=APP_NAME,
            session_service=session_service_stateful # <<< Use the service from Step 4/5
        )
        print(f"✅ Runner created for tool guardrail agent '{runner_root_tool_guardrail.agent.name}', using stateful session service.")
    else:
        print("❌ Cannot create runner. 'session_service_stateful' from Step 4/5 is missing.")

else:
    print("❌ Cannot create root agent with tool guardrail. Prerequisites missing.")


```

---

**3\. Interact to Test the Tool Guardrail**

Let's test the interaction flow, again using the same stateful session (`SESSION_ID_STATEFUL`) from the previous steps.

1. Request weather for "New York": Passes both callbacks, tool executes (using Fahrenheit preference from state).  
2. Request weather for "Paris": Passes `before_model_callback`. LLM decides to call `get_weather_stateful(city='Paris')`. `before_tool_callback` intercepts, blocks the tool, and returns the error dictionary. Agent relays this error.  
3. Request weather for "London": Passes both callbacks, tool executes normally.


```python
# @title 3. Interact to Test the Tool Argument Guardrail
import asyncio # Ensure asyncio is imported

# Ensure the runner for the tool guardrail agent is available
if 'runner_root_tool_guardrail' in globals() and runner_root_tool_guardrail:
    # Define the main async function for the tool guardrail test conversation.
    # The 'await' keywords INSIDE this function are necessary for async operations.
    async def run_tool_guardrail_test():
        print("\n--- Testing Tool Argument Guardrail ('Paris' blocked) ---")

        # Use the runner for the agent with both callbacks and the existing stateful session
        # Define a helper lambda for cleaner interaction calls
        interaction_func = lambda query: call_agent_async(query,
                                                         runner_root_tool_guardrail,
                                                         USER_ID_STATEFUL, # Use existing user ID
                                                         SESSION_ID_STATEFUL # Use existing session ID
                                                        )
        # 1. Allowed city (Should pass both callbacks, use Fahrenheit state)
        print("--- Turn 1: Requesting weather in New York (expect allowed) ---")
        await interaction_func("What's the weather in New York?")

        # 2. Blocked city (Should pass model callback, but be blocked by tool callback)
        print("\n--- Turn 2: Requesting weather in Paris (expect blocked by tool guardrail) ---")
        await interaction_func("How about Paris?") # Tool callback should intercept this

        # 3. Another allowed city (Should work normally again)
        print("\n--- Turn 3: Requesting weather in London (expect allowed) ---")
        await interaction_func("Tell me the weather in London.")

    # --- Execute the `run_tool_guardrail_test` async function ---
    # Choose ONE of the methods below based on your environment.

    # METHOD 1: Direct await (Default for Notebooks/Async REPLs)
    # If your environment supports top-level await (like Colab/Jupyter notebooks),
    # it means an event loop is already running, so you can directly await the function.
    print("Attempting execution using 'await' (default for notebooks)...")
    await run_tool_guardrail_test()

    # METHOD 2: asyncio.run (For Standard Python Scripts [.py])
    # If running this code as a standard Python script from your terminal,
    # the script context is synchronous. `asyncio.run()` is needed to
    # create and manage an event loop to execute your async function.
    # To use this method:
    # 1. Comment out the `await run_tool_guardrail_test()` line above.
    # 2. Uncomment the following block:
    """
    import asyncio
    if __name__ == "__main__": # Ensures this runs only when script is executed directly
        print("Executing using 'asyncio.run()' (for standard Python scripts)...")
        try:
            # This creates an event loop, runs your async function, and closes the loop.
            asyncio.run(run_tool_guardrail_test())
        except Exception as e:
            print(f"An error occurred: {e}")
    """

    # --- Inspect final session state after the conversation ---
    # This block runs after either execution method completes.
    # Optional: Check state for the tool block trigger flag
    print("\n--- Inspecting Final Session State (After Tool Guardrail Test) ---")
    # Use the session service instance associated with this stateful session
    final_session = await session_service_stateful.get_session(app_name=APP_NAME,
                                                         user_id=USER_ID_STATEFUL,
                                                         session_id= SESSION_ID_STATEFUL)
    if final_session:
        # Use .get() for safer access
        print(f"Tool Guardrail Triggered Flag: {final_session.state.get('guardrail_tool_block_triggered', 'Not Set (or False)')}")
        print(f"Last Weather Report: {final_session.state.get('last_weather_report', 'Not Set')}") # Should be London weather if successful
        print(f"Temperature Unit: {final_session.state.get('user_preference_temperature_unit', 'Not Set')}") # Should be Fahrenheit
        # print(f"Full State Dict: {final_session.state}") # For detailed view
    else:
        print("\n❌ Error: Could not retrieve final session state.")

else:
    print("\n⚠️ Skipping tool guardrail test. Runner ('runner_root_tool_guardrail') is not available.")
```

---

Analyze the output:

1. **New York:** The `before_model_callback` allows the request. The LLM requests `get_weather_stateful`. The `before_tool_callback` runs, inspects the args (`{'city': 'New York'}`), sees it's not "Paris", prints "Allowing tool..." and returns `None`. The actual `get_weather_stateful` function executes, reads "Fahrenheit" from state, and returns the weather report. The agent relays this, and it gets saved via `output_key`.  
2. **Paris:** The `before_model_callback` allows the request. The LLM requests `get_weather_stateful(city='Paris')`. The `before_tool_callback` runs, inspects the args, detects "Paris", prints "Blocking tool execution\!", sets the state flag, and returns the error dictionary `{'status': 'error', 'error_message': 'Policy restriction...'}`. The actual `get_weather_stateful` function is **never executed**. The agent receives the error dictionary *as if it were the tool's output* and formulates a response based on that error message.  
3. **London:** Behaves like New York, passing both callbacks and executing the tool successfully. The new London weather report overwrites the `last_weather_report` in the state.

You've now added a crucial safety layer controlling not just *what* reaches the LLM, but also *how* the agent's tools can be used based on the specific arguments generated by the LLM. Callbacks like `before_model_callback` and `before_tool_callback` are essential for building robust, safe, and policy-compliant agent applications.



---


## Conclusion: Your Agent Team is Ready!

Congratulations! You've successfully journeyed from building a single, basic weather agent to constructing a sophisticated, multi-agent team using the Agent Development Kit (ADK).

**Let's recap what you've accomplished:**

*   You started with a **fundamental agent** equipped with a single tool (`get_weather`).
*   You explored ADK's **multi-model flexibility** using LiteLLM, running the same core logic with different LLMs like Gemini, GPT-4o, and Claude.
*   You embraced **modularity** by creating specialized sub-agents (`greeting_agent`, `farewell_agent`) and enabling **automatic delegation** from a root agent.
*   You gave your agents **memory** using **Session State**, allowing them to remember user preferences (`temperature_unit`) and past interactions (`output_key`).
*   You implemented crucial **safety guardrails** using both `before_model_callback` (blocking specific input keywords) and `before_tool_callback` (blocking tool execution based on arguments like the city "Paris").

Through building this progressive Weather Bot team, you've gained hands-on experience with core ADK concepts essential for developing complex, intelligent applications.

**Key Takeaways:**

*   **Agents & Tools:** The fundamental building blocks for defining capabilities and reasoning. Clear instructions and docstrings are paramount.
*   **Runners & Session Services:** The engine and memory management system that orchestrate agent execution and maintain conversational context.
*   **Delegation:** Designing multi-agent teams allows for specialization, modularity, and better management of complex tasks. Agent `description` is key for auto-flow.
*   **Session State (`ToolContext`, `output_key`):** Essential for creating context-aware, personalized, and multi-turn conversational agents.
*   **Callbacks (`before_model`, `before_tool`):** Powerful hooks for implementing safety, validation, policy enforcement, and dynamic modifications *before* critical operations (LLM calls or tool execution).
*   **Flexibility (`LiteLlm`):** ADK empowers you to choose the best LLM for the job, balancing performance, cost, and features.

**Where to Go Next?**

Your Weather Bot team is a great starting point. Here are some ideas to further explore ADK and enhance your application:

1.  **Real Weather API:** Replace the `mock_weather_db` in your `get_weather` tool with a call to a real weather API (like OpenWeatherMap, WeatherAPI).
2.  **More Complex State:** Store more user preferences (e.g., preferred location, notification settings) or conversation summaries in the session state.
3.  **Refine Delegation:** Experiment with different root agent instructions or sub-agent descriptions to fine-tune the delegation logic. Could you add a "forecast" agent?
4.  **Advanced Callbacks:**
    *   Use `after_model_callback` to potentially reformat or sanitize the LLM's response *after* it's generated.
    *   Use `after_tool_callback` to process or log the results returned by a tool.
    *   Implement `before_agent_callback` or `after_agent_callback` for agent-level entry/exit logic.
5.  **Error Handling:** Improve how the agent handles tool errors or unexpected API responses. Maybe add retry logic within a tool.
6.  **Persistent Session Storage:** Explore alternatives to `InMemorySessionService` for storing session state persistently (e.g., using databases like Firestore or Cloud SQL – requires custom implementation or future ADK integrations).
7.  **Streaming UI:** Integrate your agent team with a web framework (like FastAPI, as shown in the ADK Streaming Quickstart) to create a real-time chat interface.

The Agent Development Kit provides a robust foundation for building sophisticated LLM-powered applications. By mastering the concepts covered in this tutorial – tools, state, delegation, and callbacks – you are well-equipped to tackle increasingly complex agentic systems.

Happy building!



================================================
FILE: docs/tutorials/index.md
================================================
# ADK Tutorials!

Get started with the Agent Development Kit (ADK) through our collection of
practical guides. These tutorials are designed in a simple, progressive,
step-by-step fashion, introducing you to different ADK features and
capabilities.

This approach allows you to learn and build incrementally – starting with
foundational concepts and gradually tackling more advanced agent development
techniques. You'll explore how to apply these features effectively across
various use cases, equipping you to build your own sophisticated agentic
applications with ADK. Explore our collection below and happy building:

<div class="grid cards" markdown>

-   :material-console-line: **Agent Team**

    ---

    Learn to build an intelligent multi-agent weather bot and master key ADK
    features: defining Tools, using multiple LLMs (Gemini, GPT, Claude) with
    LiteLLM, orchestrating agent delegation, adding memory with session state,
    and ensuring safety via callbacks.

    [:octicons-arrow-right-24: Start learning here](agent-team.md)

</div>


Directory structure:
└── agents/
    ├── custom-agents.md
    ├── index.md
    ├── llm-agents.md
    ├── models.md
    ├── multi-agents.md
    └── workflow-agents/
        ├── index.md
        ├── loop-agents.md
        ├── parallel-agents.md
        └── sequential-agents.md

================================================
FILE: docs/agents/custom-agents.md
================================================
!!! warning "Advanced Concept"

    Building custom agents by directly implementing `_run_async_impl` (or its equivalent in other languages) provides powerful control but is more complex than using the predefined `LlmAgent` or standard `WorkflowAgent` types. We recommend understanding those foundational agent types first before tackling custom orchestration logic.

# Custom agents

Custom agents provide the ultimate flexibility in ADK, allowing you to define **arbitrary orchestration logic** by inheriting directly from `BaseAgent` and implementing your own control flow. This goes beyond the predefined patterns of `SequentialAgent`, `LoopAgent`, and `ParallelAgent`, enabling you to build highly specific and complex agentic workflows.

## Introduction: Beyond Predefined Workflows

### What is a Custom Agent?

A Custom Agent is essentially any class you create that inherits from `google.adk.agents.BaseAgent` and implements its core execution logic within the `_run_async_impl` asynchronous method. You have complete control over how this method calls other agents (sub-agents), manages state, and handles events. 

!!! Note
    The specific method name for implementing an agent's core asynchronous logic may vary slightly by SDK language (e.g., `runAsyncImpl` in Java, `_run_async_impl` in Python). Refer to the language-specific API documentation for details.

### Why Use Them?

While the standard [Workflow Agents](workflow-agents/index.md) (`SequentialAgent`, `LoopAgent`, `ParallelAgent`) cover common orchestration patterns, you'll need a Custom agent when your requirements include:

* **Conditional Logic:** Executing different sub-agents or taking different paths based on runtime conditions or the results of previous steps.
* **Complex State Management:** Implementing intricate logic for maintaining and updating state throughout the workflow beyond simple sequential passing.
* **External Integrations:** Incorporating calls to external APIs, databases, or custom libraries directly within the orchestration flow control.
* **Dynamic Agent Selection:** Choosing which sub-agent(s) to run next based on dynamic evaluation of the situation or input.
* **Unique Workflow Patterns:** Implementing orchestration logic that doesn't fit the standard sequential, parallel, or loop structures.


![intro_components.png](../assets/custom-agent-flow.png)


## Implementing Custom Logic:

The core of any custom agent is the method where you define its unique asynchronous behavior. This method allows you to orchestrate sub-agents and manage the flow of execution.

=== "Python"

      The heart of any custom agent is the `_run_async_impl` method. This is where you define its unique behavior.
      
      * **Signature:** `async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:`
      * **Asynchronous Generator:** It must be an `async def` function and return an `AsyncGenerator`. This allows it to `yield` events produced by sub-agents or its own logic back to the runner.
      * **`ctx` (InvocationContext):** Provides access to crucial runtime information, most importantly `ctx.session.state`, which is the primary way to share data between steps orchestrated by your custom agent.

=== "Java"

    The heart of any custom agent is the `runAsyncImpl` method, which you override from `BaseAgent`.

    *   **Signature:** `protected Flowable<Event> runAsyncImpl(InvocationContext ctx)`
    *   **Reactive Stream (`Flowable`):** It must return an `io.reactivex.rxjava3.core.Flowable<Event>`. This `Flowable` represents a stream of events that will be produced by the custom agent's logic, often by combining or transforming multiple `Flowable` from sub-agents.
    *   **`ctx` (InvocationContext):** Provides access to crucial runtime information, most importantly `ctx.session().state()`, which is a `java.util.concurrent.ConcurrentMap<String, Object>`. This is the primary way to share data between steps orchestrated by your custom agent.

**Key Capabilities within the Core Asynchronous Method:**

=== "Python"

    1. **Calling Sub-Agents:** You invoke sub-agents (which are typically stored as instance attributes like `self.my_llm_agent`) using their `run_async` method and yield their events:

          ```python
          async for event in self.some_sub_agent.run_async(ctx):
              # Optionally inspect or log the event
              yield event # Pass the event up
          ```

    2. **Managing State:** Read from and write to the session state dictionary (`ctx.session.state`) to pass data between sub-agent calls or make decisions:
          ```python
          # Read data set by a previous agent
          previous_result = ctx.session.state.get("some_key")
      
          # Make a decision based on state
          if previous_result == "some_value":
              # ... call a specific sub-agent ...
          else:
              # ... call another sub-agent ...
      
          # Store a result for a later step (often done via a sub-agent's output_key)
          # ctx.session.state["my_custom_result"] = "calculated_value"
          ```

    3. **Implementing Control Flow:** Use standard Python constructs (`if`/`elif`/`else`, `for`/`while` loops, `try`/`except`) to create sophisticated, conditional, or iterative workflows involving your sub-agents.

=== "Java"

    1. **Calling Sub-Agents:** You invoke sub-agents (which are typically stored as instance attributes or objects) using their asynchronous run method and return their event streams:

           You typically chain `Flowable`s from sub-agents using RxJava operators like `concatWith`, `flatMapPublisher`, or `concatArray`.

           ```java
           // Example: Running one sub-agent
           // return someSubAgent.runAsync(ctx);
      
           // Example: Running sub-agents sequentially
           Flowable<Event> firstAgentEvents = someSubAgent1.runAsync(ctx)
               .doOnNext(event -> System.out.println("Event from agent 1: " + event.id()));
      
           Flowable<Event> secondAgentEvents = Flowable.defer(() ->
               someSubAgent2.runAsync(ctx)
                   .doOnNext(event -> System.out.println("Event from agent 2: " + event.id()))
           );
      
           return firstAgentEvents.concatWith(secondAgentEvents);
           ```
           The `Flowable.defer()` is often used for subsequent stages if their execution depends on the completion or state after prior stages.

    2. **Managing State:** Read from and write to the session state to pass data between sub-agent calls or make decisions. The session state is a `java.util.concurrent.ConcurrentMap<String, Object>` obtained via `ctx.session().state()`.
        
        ```java
        // Read data set by a previous agent
        Object previousResult = ctx.session().state().get("some_key");

        // Make a decision based on state
        if ("some_value".equals(previousResult)) {
            // ... logic to include a specific sub-agent's Flowable ...
        } else {
            // ... logic to include another sub-agent's Flowable ...
        }

        // Store a result for a later step (often done via a sub-agent's output_key)
        // ctx.session().state().put("my_custom_result", "calculated_value");
        ```

    3. **Implementing Control Flow:** Use standard language constructs (`if`/`else`, loops, `try`/`catch`) combined with reactive operators (RxJava) to create sophisticated workflows.

          *   **Conditional:** `Flowable.defer()` to choose which `Flowable` to subscribe to based on a condition, or `filter()` if you're filtering events within a stream.
          *   **Iterative:** Operators like `repeat()`, `retry()`, or by structuring your `Flowable` chain to recursively call parts of itself based on conditions (often managed with `flatMapPublisher` or `concatMap`).

## Managing Sub-Agents and State

Typically, a custom agent orchestrates other agents (like `LlmAgent`, `LoopAgent`, etc.).

* **Initialization:** You usually pass instances of these sub-agents into your custom agent's constructor and store them as instance fields/attributes (e.g., `this.story_generator = story_generator_instance` or `self.story_generator = story_generator_instance`). This makes them accessible within the custom agent's core asynchronous execution logic (such as: `_run_async_impl` method).
* **Sub Agents List:** When initializing the `BaseAgent` using it's `super()` constructor, you should pass a `sub agents` list. This list tells the ADK framework about the agents that are part of this custom agent's immediate hierarchy. It's important for framework features like lifecycle management, introspection, and potentially future routing capabilities, even if your core execution logic (`_run_async_impl`) calls the agents directly via `self.xxx_agent`. Include the agents that your custom logic directly invokes at the top level.
* **State:** As mentioned, `ctx.session.state` is the standard way sub-agents (especially `LlmAgent`s using `output key`) communicate results back to the orchestrator and how the orchestrator passes necessary inputs down.

## Design Pattern Example: `StoryFlowAgent`

Let's illustrate the power of custom agents with an example pattern: a multi-stage content generation workflow with conditional logic.

**Goal:** Create a system that generates a story, iteratively refines it through critique and revision, performs final checks, and crucially, *regenerates the story if the final tone check fails*.

**Why Custom?** The core requirement driving the need for a custom agent here is the **conditional regeneration based on the tone check**. Standard workflow agents don't have built-in conditional branching based on the outcome of a sub-agent's task. We need custom logic (`if tone == "negative": ...`) within the orchestrator.

---

### Part 1: Simplified custom agent Initialization

=== "Python"

    We define the `StoryFlowAgent` inheriting from `BaseAgent`. In `__init__`, we store the necessary sub-agents (passed in) as instance attributes and tell the `BaseAgent` framework about the top-level agents this custom agent will directly orchestrate.
    
    ```python
    --8<-- "examples/python/snippets/agents/custom-agent/storyflow_agent.py:init"
    ```

=== "Java"

    We define the `StoryFlowAgentExample` by extending `BaseAgent`. In its **constructor**, we store the necessary sub-agent instances (passed as parameters) as instance fields. These top-level sub-agents, which this custom agent will directly orchestrate, are also passed to the `super` constructor of `BaseAgent` as a list.

    ```java
    --8<-- "examples/java/snippets/src/main/java/agents/StoryFlowAgentExample.java:init"
    ```
---

### Part 2: Defining the Custom Execution Logic

=== "Python"

    This method orchestrates the sub-agents using standard Python async/await and control flow.
    
    ```python
    --8<-- "examples/python/snippets/agents/custom-agent/storyflow_agent.py:executionlogic"
    ```
    **Explanation of Logic:**

    1. The initial `story_generator` runs. Its output is expected to be in `ctx.session.state["current_story"]`.
    2. The `loop_agent` runs, which internally calls the `critic` and `reviser` sequentially for `max_iterations` times. They read/write `current_story` and `criticism` from/to the state.
    3. The `sequential_agent` runs, calling `grammar_check` then `tone_check`, reading `current_story` and writing `grammar_suggestions` and `tone_check_result` to the state.
    4. **Custom Part:** The `if` statement checks the `tone_check_result` from the state. If it's "negative", the `story_generator` is called *again*, overwriting the `current_story` in the state. Otherwise, the flow ends.


=== "Java"
    
    The `runAsyncImpl` method orchestrates the sub-agents using RxJava's Flowable streams and operators for asynchronous control flow.

    ```java
    --8<-- "examples/java/snippets/src/main/java/agents/StoryFlowAgentExample.java:executionlogic"
    ```
    **Explanation of Logic:**

    1. The initial `storyGenerator.runAsync(invocationContext)` Flowable is executed. Its output is expected to be in `invocationContext.session().state().get("current_story")`.
    2. The `loopAgent's` Flowable runs next (due to `Flowable.concatArray` and `Flowable.defer`). The LoopAgent internally calls the `critic` and `reviser` sub-agents sequentially for up to `maxIterations`. They read/write `current_story` and `criticism` from/to the state.
    3. Then, the `sequentialAgent's` Flowable executes. It calls the `grammar_check` then `tone_check`, reading `current_story` and writing `grammar_suggestions` and `tone_check_result` to the state.
    4. **Custom Part:** After the sequentialAgent completes, logic within a `Flowable.defer` checks the "tone_check_result" from `invocationContext.session().state()`. If it's "negative", the `storyGenerator` Flowable is *conditionally concatenated* and executed again, overwriting "current_story". Otherwise, an empty Flowable is used, and the overall workflow proceeds to completion.

---

### Part 3: Defining the LLM Sub-Agents

These are standard `LlmAgent` definitions, responsible for specific tasks. Their `output key` parameter is crucial for placing results into the `session.state` where other agents or the custom orchestrator can access them.

!!! tip "Direct State Injection in Instructions"
    Notice the `story_generator`'s instruction. The `{var}` syntax is a placeholder. Before the instruction is sent to the LLM, the ADK framework automatically replaces (Example:`{topic}`) with the value of `session.state['topic']`. This is the recommended way to provide context to an agent, using templating in the instructions. For more details, see the [State documentation](../sessions/state.md#accessing-session-state-in-agent-instructions).

=== "Python"

    ```python
    GEMINI_2_FLASH = "gemini-2.0-flash" # Define model constant
    --8<-- "examples/python/snippets/agents/custom-agent/storyflow_agent.py:llmagents"
    ```
=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/agents/StoryFlowAgentExample.java:llmagents"
    ```

---

### Part 4: Instantiating and Running the custom agent

Finally, you instantiate your `StoryFlowAgent` and use the `Runner` as usual.

=== "Python"

    ```python
    --8<-- "examples/python/snippets/agents/custom-agent/storyflow_agent.py:story_flow_agent"
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/agents/StoryFlowAgentExample.java:story_flow_agent"
    ```

*(Note: The full runnable code, including imports and execution logic, can be found linked below.)*

---

## Full Code Example

???+ "Storyflow Agent"

    === "Python"
    
        ```python
        # Full runnable code for the StoryFlowAgent example
        --8<-- "examples/python/snippets/agents/custom-agent/storyflow_agent.py"
        ```
    
    === "Java"
    
        ```java
        # Full runnable code for the StoryFlowAgent example
        --8<-- "examples/java/snippets/src/main/java/agents/StoryFlowAgentExample.java:full_code"
        ```



================================================
FILE: docs/agents/index.md
================================================
# Agents

In the Agent Development Kit (ADK), an **Agent** is a self-contained execution unit designed to act autonomously to achieve specific goals. Agents can perform tasks, interact with users, utilize external tools, and coordinate with other agents.

The foundation for all agents in ADK is the `BaseAgent` class. It serves as the fundamental blueprint. To create functional agents, you typically extend `BaseAgent` in one of three main ways, catering to different needs – from intelligent reasoning to structured process control.

<img src="../assets/agent-types.png" alt="Types of agents in ADK">

## Core Agent Categories

ADK provides distinct agent categories to build sophisticated applications:

1. [**LLM Agents (`LlmAgent`, `Agent`)**](llm-agents.md): These agents utilize Large Language Models (LLMs) as their core engine to understand natural language, reason, plan, generate responses, and dynamically decide how to proceed or which tools to use, making them ideal for flexible, language-centric tasks. [Learn more about LLM Agents...](llm-agents.md)

2. [**Workflow Agents (`SequentialAgent`, `ParallelAgent`, `LoopAgent`)**](workflow-agents/index.md): These specialized agents control the execution flow of other agents in predefined, deterministic patterns (sequence, parallel, or loop) without using an LLM for the flow control itself, perfect for structured processes needing predictable execution. [Explore Workflow Agents...](workflow-agents/index.md)

3. [**Custom Agents**](custom-agents.md): Created by extending `BaseAgent` directly, these agents allow you to implement unique operational logic, specific control flows, or specialized integrations not covered by the standard types, catering to highly tailored application requirements. [Discover how to build Custom Agents...](custom-agents.md)

## Choosing the Right Agent Type

The following table provides a high-level comparison to help distinguish between the agent types. As you explore each type in more detail in the subsequent sections, these distinctions will become clearer.

| Feature              | LLM Agent (`LlmAgent`)              | Workflow Agent                              | Custom Agent (`BaseAgent` subclass)      |
| :------------------- | :---------------------------------- | :------------------------------------------ |:-----------------------------------------|
| **Primary Function** | Reasoning, Generation, Tool Use     | Controlling Agent Execution Flow            | Implementing Unique Logic/Integrations   |
| **Core Engine**  | Large Language Model (LLM)          | Predefined Logic (Sequence, Parallel, Loop) | Custom Code                              |
| **Determinism**  | Non-deterministic (Flexible)        | Deterministic (Predictable)                 | Can be either, based on implementation   |
| **Primary Use**  | Language tasks, Dynamic decisions   | Structured processes, Orchestration         | Tailored requirements, Specific workflows|

## Agents Working Together: Multi-Agent Systems

While each agent type serves a distinct purpose, the true power often comes from combining them. Complex applications frequently employ [multi-agent architectures](multi-agents.md) where:

* **LLM Agents** handle intelligent, language-based task execution.
* **Workflow Agents** manage the overall process flow using standard patterns.
* **Custom Agents** provide specialized capabilities or rules needed for unique integrations.

Understanding these core types is the first step toward building sophisticated, capable AI applications with ADK.

---

## What's Next?

Now that you have an overview of the different agent types available in ADK, dive deeper into how they work and how to use them effectively:

* [**LLM Agents:**](llm-agents.md) Explore how to configure agents powered by large language models, including setting instructions, providing tools, and enabling advanced features like planning and code execution.
* [**Workflow Agents:**](workflow-agents/index.md) Learn how to orchestrate tasks using `SequentialAgent`, `ParallelAgent`, and `LoopAgent` for structured and predictable processes.
* [**Custom Agents:**](custom-agents.md) Discover the principles of extending `BaseAgent` to build agents with unique logic and integrations tailored to your specific needs.
* [**Multi-Agents:**](multi-agents.md) Understand how to combine different agent types to create sophisticated, collaborative systems capable of tackling complex problems.
* [**Models:**](models.md) Learn about the different LLM integrations available and how to select the right model for your agents.



================================================
FILE: docs/agents/llm-agents.md
================================================
# LLM Agent

The `LlmAgent` (often aliased simply as `Agent`) is a core component in ADK,
acting as the "thinking" part of your application. It leverages the power of a
Large Language Model (LLM) for reasoning, understanding natural language, making
decisions, generating responses, and interacting with tools.

Unlike deterministic [Workflow Agents](workflow-agents/index.md) that follow
predefined execution paths, `LlmAgent` behavior is non-deterministic. It uses
the LLM to interpret instructions and context, deciding dynamically how to
proceed, which tools to use (if any), or whether to transfer control to another
agent.

Building an effective `LlmAgent` involves defining its identity, clearly guiding
its behavior through instructions, and equipping it with the necessary tools and
capabilities.

## Defining the Agent's Identity and Purpose

First, you need to establish what the agent *is* and what it's *for*.

* **`name` (Required):** Every agent needs a unique string identifier. This
  `name` is crucial for internal operations, especially in multi-agent systems
  where agents need to refer to or delegate tasks to each other. Choose a
  descriptive name that reflects the agent's function (e.g.,
  `customer_support_router`, `billing_inquiry_agent`). Avoid reserved names like
  `user`.

* **`description` (Optional, Recommended for Multi-Agent):** Provide a concise
  summary of the agent's capabilities. This description is primarily used by
  *other* LLM agents to determine if they should route a task to this agent.
  Make it specific enough to differentiate it from peers (e.g., "Handles
  inquiries about current billing statements," not just "Billing agent").

* **`model` (Required):** Specify the underlying LLM that will power this
  agent's reasoning. This is a string identifier like `"gemini-2.0-flash"`. The
  choice of model impacts the agent's capabilities, cost, and performance. See
  the [Models](models.md) page for available options and considerations.

=== "Python"

    ```python
    # Example: Defining the basic identity
    capital_agent = LlmAgent(
        model="gemini-2.0-flash",
        name="capital_agent",
        description="Answers user questions about the capital city of a given country."
        # instruction and tools will be added next
    )
    ```

=== "Java"

    ```java
    // Example: Defining the basic identity
    LlmAgent capitalAgent =
        LlmAgent.builder()
            .model("gemini-2.0-flash")
            .name("capital_agent")
            .description("Answers user questions about the capital city of a given country.")
            // instruction and tools will be added next
            .build();
    ```


## Guiding the Agent: Instructions (`instruction`)

The `instruction` parameter is arguably the most critical for shaping an
`LlmAgent`'s behavior. It's a string (or a function returning a string) that
tells the agent:

* Its core task or goal.
* Its personality or persona (e.g., "You are a helpful assistant," "You are a witty pirate").
* Constraints on its behavior (e.g., "Only answer questions about X," "Never reveal Y").
* How and when to use its `tools`. You should explain the purpose of each tool and the circumstances under which it should be called, supplementing any descriptions within the tool itself.
* The desired format for its output (e.g., "Respond in JSON," "Provide a bulleted list").

**Tips for Effective Instructions:**

* **Be Clear and Specific:** Avoid ambiguity. Clearly state the desired actions and outcomes.
* **Use Markdown:** Improve readability for complex instructions using headings, lists, etc.
* **Provide Examples (Few-Shot):** For complex tasks or specific output formats, include examples directly in the instruction.
* **Guide Tool Use:** Don't just list tools; explain *when* and *why* the agent should use them.

**State:**

* The instruction is a string template, you can use the `{var}` syntax to insert dynamic values into the instruction.
* `{var}` is used to insert the value of the state variable named var.
* `{artifact.var}` is used to insert the text content of the artifact named var.
* If the state variable or artifact does not exist, the agent will raise an error. If you want to ignore the error, you can append a `?` to the variable name as in `{var?}`.

=== "Python"

    ```python
    # Example: Adding instructions
    capital_agent = LlmAgent(
        model="gemini-2.0-flash",
        name="capital_agent",
        description="Answers user questions about the capital city of a given country.",
        instruction="""You are an agent that provides the capital city of a country.
    When a user asks for the capital of a country:
    1. Identify the country name from the user's query.
    2. Use the `get_capital_city` tool to find the capital.
    3. Respond clearly to the user, stating the capital city.
    Example Query: "What's the capital of {country}?"
    Example Response: "The capital of France is Paris."
    """,
        # tools will be added next
    )
    ```

=== "Java"

    ```java
    // Example: Adding instructions
    LlmAgent capitalAgent =
        LlmAgent.builder()
            .model("gemini-2.0-flash")
            .name("capital_agent")
            .description("Answers user questions about the capital city of a given country.")
            .instruction(
                """
                You are an agent that provides the capital city of a country.
                When a user asks for the capital of a country:
                1. Identify the country name from the user's query.
                2. Use the `get_capital_city` tool to find the capital.
                3. Respond clearly to the user, stating the capital city.
                Example Query: "What's the capital of {country}?"
                Example Response: "The capital of France is Paris."
                """)
            // tools will be added next
            .build();
    ```

*(Note: For instructions that apply to *all* agents in a system, consider using
`global_instruction` on the root agent, detailed further in the
[Multi-Agents](multi-agents.md) section.)*

## Equipping the Agent: Tools (`tools`)

Tools give your `LlmAgent` capabilities beyond the LLM's built-in knowledge or
reasoning. They allow the agent to interact with the outside world, perform
calculations, fetch real-time data, or execute specific actions.

* **`tools` (Optional):** Provide a list of tools the agent can use. Each item in the list can be:
    * A native function or method (wrapped as a `FunctionTool`). Python ADK automatically wraps the native function into a `FuntionTool` whereas, you must explicitly wrap your Java methods using `FunctionTool.create(...)`
    * An instance of a class inheriting from `BaseTool`.
    * An instance of another agent (`AgentTool`, enabling agent-to-agent delegation - see [Multi-Agents](multi-agents.md)).

The LLM uses the function/tool names, descriptions (from docstrings or the
`description` field), and parameter schemas to decide which tool to call based
on the conversation and its instructions.

=== "Python"

    ```python
    # Define a tool function
    def get_capital_city(country: str) -> str:
      """Retrieves the capital city for a given country."""
      # Replace with actual logic (e.g., API call, database lookup)
      capitals = {"france": "Paris", "japan": "Tokyo", "canada": "Ottawa"}
      return capitals.get(country.lower(), f"Sorry, I don't know the capital of {country}.")
    
    # Add the tool to the agent
    capital_agent = LlmAgent(
        model="gemini-2.0-flash",
        name="capital_agent",
        description="Answers user questions about the capital city of a given country.",
        instruction="""You are an agent that provides the capital city of a country... (previous instruction text)""",
        tools=[get_capital_city] # Provide the function directly
    )
    ```

=== "Java"

    ```java
    
    // Define a tool function
    // Retrieves the capital city of a given country.
    public static Map<String, Object> getCapitalCity(
            @Schema(name = "country", description = "The country to get capital for")
            String country) {
      // Replace with actual logic (e.g., API call, database lookup)
      Map<String, String> countryCapitals = new HashMap<>();
      countryCapitals.put("canada", "Ottawa");
      countryCapitals.put("france", "Paris");
      countryCapitals.put("japan", "Tokyo");
    
      String result =
              countryCapitals.getOrDefault(
                      country.toLowerCase(), "Sorry, I couldn't find the capital for " + country + ".");
      return Map.of("result", result); // Tools must return a Map
    }
    
    // Add the tool to the agent
    FunctionTool capitalTool = FunctionTool.create(experiment.getClass(), "getCapitalCity");
    LlmAgent capitalAgent =
        LlmAgent.builder()
            .model("gemini-2.0-flash")
            .name("capital_agent")
            .description("Answers user questions about the capital city of a given country.")
            .instruction("You are an agent that provides the capital city of a country... (previous instruction text)")
            .tools(capitalTool) // Provide the function wrapped as a FunctionTool
            .build();
    ```

Learn more about Tools in the [Tools](../tools/index.md) section.

## Advanced Configuration & Control

Beyond the core parameters, `LlmAgent` offers several options for finer control:

### Fine-Tuning LLM Generation (`generate_content_config`)

You can adjust how the underlying LLM generates responses using `generate_content_config`.

* **`generate_content_config` (Optional):** Pass an instance of `google.genai.types.GenerateContentConfig` to control parameters like `temperature` (randomness), `max_output_tokens` (response length), `top_p`, `top_k`, and safety settings.

=== "Python"

    ```python
    from google.genai import types

    agent = LlmAgent(
        # ... other params
        generate_content_config=types.GenerateContentConfig(
            temperature=0.2, # More deterministic output
            max_output_tokens=250
        )
    )
    ```

=== "Java"

    ```java
    import com.google.genai.types.GenerateContentConfig;

    LlmAgent agent =
        LlmAgent.builder()
            // ... other params
            .generateContentConfig(GenerateContentConfig.builder()
                .temperature(0.2F) // More deterministic output
                .maxOutputTokens(250)
                .build())
            .build();
    ```

### Structuring Data (`input_schema`, `output_schema`, `output_key`)

For scenarios requiring structured data exchange with an `LLM Agent`, the ADK provides mechanisms to define expected input and desired output formats using schema definitions.

* **`input_schema` (Optional):** Define a schema representing the expected input structure. If set, the user message content passed to this agent *must* be a JSON string conforming to this schema. Your instructions should guide the user or preceding agent accordingly.

* **`output_schema` (Optional):** Define a schema representing the desired output structure. If set, the agent's final response *must* be a JSON string conforming to this schema.
    * **Constraint:** Using `output_schema` enables controlled generation within the LLM but **disables the agent's ability to use tools or transfer control to other agents**. Your instructions must guide the LLM to produce JSON matching the schema directly.

* **`output_key` (Optional):** Provide a string key. If set, the text content of the agent's *final* response will be automatically saved to the session's state dictionary under this key. This is useful for passing results between agents or steps in a workflow.
    * In Python, this might look like: `session.state[output_key] = agent_response_text`
    * In Java: `session.state().put(outputKey, agentResponseText)`

=== "Python"

    The input and output schema is typically a `Pydantic` BaseModel.

    ```python
    from pydantic import BaseModel, Field
    
    class CapitalOutput(BaseModel):
        capital: str = Field(description="The capital of the country.")
    
    structured_capital_agent = LlmAgent(
        # ... name, model, description
        instruction="""You are a Capital Information Agent. Given a country, respond ONLY with a JSON object containing the capital. Format: {"capital": "capital_name"}""",
        output_schema=CapitalOutput, # Enforce JSON output
        output_key="found_capital"  # Store result in state['found_capital']
        # Cannot use tools=[get_capital_city] effectively here
    )
    ```

=== "Java"

     The input and output schema is a `google.genai.types.Schema` object.

    ```java
    private static final Schema CAPITAL_OUTPUT =
        Schema.builder()
            .type("OBJECT")
            .description("Schema for capital city information.")
            .properties(
                Map.of(
                    "capital",
                    Schema.builder()
                        .type("STRING")
                        .description("The capital city of the country.")
                        .build()))
            .build();
    
    LlmAgent structuredCapitalAgent =
        LlmAgent.builder()
            // ... name, model, description
            .instruction(
                    "You are a Capital Information Agent. Given a country, respond ONLY with a JSON object containing the capital. Format: {\"capital\": \"capital_name\"}")
            .outputSchema(capitalOutput) // Enforce JSON output
            .outputKey("found_capital") // Store result in state.get("found_capital")
            // Cannot use tools(getCapitalCity) effectively here
            .build();
    ```

### Managing Context (`include_contents`)

Control whether the agent receives the prior conversation history.

* **`include_contents` (Optional, Default: `'default'`):** Determines if the `contents` (history) are sent to the LLM.
    * `'default'`: The agent receives the relevant conversation history.
    * `'none'`: The agent receives no prior `contents`. It operates based solely on its current instruction and any input provided in the *current* turn (useful for stateless tasks or enforcing specific contexts).

=== "Python"

    ```python
    stateless_agent = LlmAgent(
        # ... other params
        include_contents='none'
    )
    ```

=== "Java"

    ```java
    import com.google.adk.agents.LlmAgent.IncludeContents;
    
    LlmAgent statelessAgent =
        LlmAgent.builder()
            // ... other params
            .includeContents(IncludeContents.NONE)
            .build();
    ```

### Planner

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

**`planner` (Optional):** Assign a `BasePlanner` instance to enable multi-step reasoning and planning before execution. There are two main planners:

* **`BuiltInPlanner`:** Leverages the model's built-in planning capabilities (e.g., Gemini's thinking feature). See [Gemini Thinking](https://ai.google.dev/gemini-api/docs/thinking) for details and examples.

    Here, the `thinking_budget` parameter guides the model on the number of thinking tokens to use when generating a response. The `include_thoughts` parameter controls whether the model should include its raw thoughts and internal reasoning process in the response.

    ```python
    from google.adk import Agent
    from google.adk.planners import BuiltInPlanner
    from google.genai import types

    my_agent = Agent(
        model="gemini-2.5-flash",
        planner=BuiltInPlanner(
            thinking_config=types.ThinkingConfig(
                include_thoughts=True,
                thinking_budget=1024,
            )
        ),
        # ... your tools here
    )
    ```
    
* **`PlanReActPlanner`:** This planner instructs the model to follow a specific structure in its output: first create a plan, then execute actions (like calling tools), and provide reasoning for its steps. *It's particularly useful for models that don't have a built-in "thinking" feature*.

    ```python
    from google.adk import Agent
    from google.adk.planners import PlanReActPlanner

    my_agent = Agent(
        model="gemini-2.0-flash",
        planner=PlanReActPlanner(),
        # ... your tools here
    )
    ```

    The agent's response will follow a structured format:

    ```
    [user]: ai news
    [google_search_agent]: /*PLANNING*/
    1. Perform a Google search for "latest AI news" to get current updates and headlines related to artificial intelligence.
    2. Synthesize the information from the search results to provide a summary of recent AI news.

    /*ACTION*/
    /*REASONING*/
    The search results provide a comprehensive overview of recent AI news, covering various aspects like company developments, research breakthroughs, and applications. I have enough information to answer the user's request.

    /*FINAL_ANSWER*/
    Here's a summary of recent AI news:
    ....
    ```

### Code Execution

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

* **`code_executor` (Optional):** Provide a `BaseCodeExecutor` instance to allow the agent to execute code blocks found in the LLM's response. ([See Tools/Built-in tools](../tools/built-in-tools.md)).

## Putting It Together: Example

??? "Code"
    Here's the complete basic `capital_agent`:

    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/agents/llm-agent/capital_agent.py"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/agents/LlmAgentExample.java:full_code"
        ```

_(This example demonstrates the core concepts. More complex agents might incorporate schemas, context control, planning, etc.)_

## Related Concepts (Deferred Topics)

While this page covers the core configuration of `LlmAgent`, several related concepts provide more advanced control and are detailed elsewhere:

* **Callbacks:** Intercepting execution points (before/after model calls, before/after tool calls) using `before_model_callback`, `after_model_callback`, etc. See [Callbacks](../callbacks/types-of-callbacks.md).
* **Multi-Agent Control:** Advanced strategies for agent interaction, including planning (`planner`), controlling agent transfer (`disallow_transfer_to_parent`, `disallow_transfer_to_peers`), and system-wide instructions (`global_instruction`). See [Multi-Agents](multi-agents.md).



================================================
FILE: docs/agents/models.md
================================================
# Using Different Models with ADK

!!! Note
    Java ADK currently supports Gemini and Anthropic models. More model support coming soon.

The Agent Development Kit (ADK) is designed for flexibility, allowing you to
integrate various Large Language Models (LLMs) into your agents. While the setup
for Google Gemini models is covered in the
[Setup Foundation Models](../get-started/installation.md) guide, this page
details how to leverage Gemini effectively and integrate other popular models,
including those hosted externally or running locally.

ADK primarily uses two mechanisms for model integration:

1. **Direct String / Registry:** For models tightly integrated with Google Cloud
   (like Gemini models accessed via Google AI Studio or Vertex AI) or models
   hosted on Vertex AI endpoints. You typically provide the model name or
   endpoint resource string directly to the `LlmAgent`. ADK's internal registry
   resolves this string to the appropriate backend client, often utilizing the
   `google-genai` library.
2. **Wrapper Classes:** For broader compatibility, especially with models
   outside the Google ecosystem or those requiring specific client
   configurations (like models accessed via LiteLLM). You instantiate a specific
   wrapper class (e.g., `LiteLlm`) and pass this object as the `model` parameter
   to your `LlmAgent`.

The following sections guide you through using these methods based on your needs.

## Using Google Gemini Models

This is the most direct way to use Google's flagship models within ADK.

**Integration Method:** Pass the model's identifier string directly to the
`model` parameter of `LlmAgent` (or its alias, `Agent`).

**Backend Options & Setup:**

The `google-genai` library, used internally by ADK for Gemini, can connect
through either Google AI Studio or Vertex AI.

!!!note "Model support for voice/video streaming"

    In order to use voice/video streaming in ADK, you will need to use Gemini
    models that support the Live API. You can find the **model ID(s)** that
    support the Gemini Live API in the documentation:

    - [Google AI Studio: Gemini Live API](https://ai.google.dev/gemini-api/docs/models#live-api)
    - [Vertex AI: Gemini Live API](https://cloud.google.com/vertex-ai/generative-ai/docs/live-api)

### Google AI Studio

* **Use Case:** Google AI Studio is the easiest way to get started with Gemini.
  All you need is the [API key](https://aistudio.google.com/app/apikey). Best
  for rapid prototyping and development.
* **Setup:** Typically requires an API key:
     * Set as an environment variable or 
     * Passed during the model initialization via the `Client` (see example below)

```shell
export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
export GOOGLE_GENAI_USE_VERTEXAI=FALSE
```

* **Models:** Find all available models on the
  [Google AI for Developers site](https://ai.google.dev/gemini-api/docs/models).

### Vertex AI

* **Use Case:** Recommended for production applications, leveraging Google Cloud
  infrastructure. Gemini on Vertex AI supports enterprise-grade features,
  security, and compliance controls.
* **Setup:**
    * Authenticate using Application Default Credentials (ADC):

        ```shell
        gcloud auth application-default login
        ```

    * Configure these variables either as environment variables or by providing them directly when initializing the Model.
            
         Set your Google Cloud project and location:
    
         ```shell
         export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
         export GOOGLE_CLOUD_LOCATION="YOUR_VERTEX_AI_LOCATION" # e.g., us-central1
         ```     
    
         Explicitly tell the library to use Vertex AI:
    
         ```shell
         export GOOGLE_GENAI_USE_VERTEXAI=TRUE
         ```

* **Models:** Find available model IDs in the
  [Vertex AI documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models).

**Example:**

=== "Python"

    ```python
    from google.adk.agents import LlmAgent
    
    # --- Example using a stable Gemini Flash model ---
    agent_gemini_flash = LlmAgent(
        # Use the latest stable Flash model identifier
        model="gemini-2.0-flash",
        name="gemini_flash_agent",
        instruction="You are a fast and helpful Gemini assistant.",
        # ... other agent parameters
    )
    
    # --- Example using a powerful Gemini Pro model ---
    # Note: Always check the official Gemini documentation for the latest model names,
    # including specific preview versions if needed. Preview models might have
    # different availability or quota limitations.
    agent_gemini_pro = LlmAgent(
        # Use the latest generally available Pro model identifier
        model="gemini-2.5-pro-preview-03-25",
        name="gemini_pro_agent",
        instruction="You are a powerful and knowledgeable Gemini assistant.",
        # ... other agent parameters
    )
    ```

=== "Java"

    ```java
    // --- Example #1: using a stable Gemini Flash model with ENV variables---
    LlmAgent agentGeminiFlash =
        LlmAgent.builder()
            // Use the latest stable Flash model identifier
            .model("gemini-2.0-flash") // Set ENV variables to use this model
            .name("gemini_flash_agent")
            .instruction("You are a fast and helpful Gemini assistant.")
            // ... other agent parameters
            .build();

    // --- Example #2: using a powerful Gemini Pro model with API Key in model ---
    LlmAgent agentGeminiPro =
        LlmAgent.builder()
            // Use the latest generally available Pro model identifier
            .model(new Gemini("gemini-2.5-pro-preview-03-25",
                Client.builder()
                    .vertexAI(false)
                    .apiKey("API_KEY") // Set the API Key (or) project/ location
                    .build()))
            // Or, you can also directly pass the API_KEY
            // .model(new Gemini("gemini-2.5-pro-preview-03-25", "API_KEY"))
            .name("gemini_pro_agent")
            .instruction("You are a powerful and knowledgeable Gemini assistant.")
            // ... other agent parameters
            .build();

    // Note: Always check the official Gemini documentation for the latest model names,
    // including specific preview versions if needed. Preview models might have
    // different availability or quota limitations.
    ```

## Using Anthropic models

![java_only](https://img.shields.io/badge/Supported_in-Java-orange){ title="This feature is currently available for Java. Python support for direct Anthropic API (non-Vertex) is via LiteLLM."}

You can integrate Anthropic's Claude models directly using their API key or from a Vertex AI backend into your Java ADK applications by using the ADK's `Claude` wrapper class.

For Vertex AI backend, see the [Third-Party Models on Vertex AI](#third-party-models-on-vertex-ai-eg-anthropic-claude) section.

**Prerequisites:**

1.  **Dependencies:**
    *   **Anthropic SDK Classes (Transitive):** The Java ADK's `com.google.adk.models.Claude` wrapper relies on classes from Anthropic's official Java SDK. These are typically included as **transitive dependencies**.

2.  **Anthropic API Key:**
    *   Obtain an API key from Anthropic. Securely manage this key using a secret manager.

**Integration:**

Instantiate `com.google.adk.models.Claude`, providing the desired Claude model name and an `AnthropicOkHttpClient` configured with your API key. Then, pass this `Claude` instance to your `LlmAgent`.

**Example:**

```java
import com.anthropic.client.AnthropicClient;
import com.google.adk.agents.LlmAgent;
import com.google.adk.models.Claude;
import com.anthropic.client.okhttp.AnthropicOkHttpClient; // From Anthropic's SDK

public class DirectAnthropicAgent {
  
  private static final String CLAUDE_MODEL_ID = "claude-3-7-sonnet-latest"; // Or your preferred Claude model

  public static LlmAgent createAgent() {

    // It's recommended to load sensitive keys from a secure config
    AnthropicClient anthropicClient = AnthropicOkHttpClient.builder()
        .apiKey("ANTHROPIC_API_KEY")
        .build();

    Claude claudeModel = new Claude(
        CLAUDE_MODEL_ID,
        anthropicClient
    );

    return LlmAgent.builder()
        .name("claude_direct_agent")
        .model(claudeModel)
        .instruction("You are a helpful AI assistant powered by Anthropic Claude.")
        // ... other LlmAgent configurations
        .build();
  }

  public static void main(String[] args) {
    try {
      LlmAgent agent = createAgent();
      System.out.println("Successfully created direct Anthropic agent: " + agent.name());
    } catch (IllegalStateException e) {
      System.err.println("Error creating agent: " + e.getMessage());
    }
  }
}
```



## Using Cloud & Proprietary Models via LiteLLM

![python_only](https://img.shields.io/badge/Supported_in-Python-blue)

To access a vast range of LLMs from providers like OpenAI, Anthropic (non-Vertex
AI), Cohere, and many others, ADK offers integration through the LiteLLM
library.

**Integration Method:** Instantiate the `LiteLlm` wrapper class and pass it to
the `model` parameter of `LlmAgent`.

**LiteLLM Overview:** [LiteLLM](https://docs.litellm.ai/) acts as a translation
layer, providing a standardized, OpenAI-compatible interface to over 100+ LLMs.

**Setup:**

1. **Install LiteLLM:**
        ```shell
        pip install litellm
        ```
2. **Set Provider API Keys:** Configure API keys as environment variables for
   the specific providers you intend to use.

    * *Example for OpenAI:*

        ```shell
        export OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
        ```

    * *Example for Anthropic (non-Vertex AI):*

        ```shell
        export ANTHROPIC_API_KEY="YOUR_ANTHROPIC_API_KEY"
        ```

    * *Consult the
      [LiteLLM Providers Documentation](https://docs.litellm.ai/docs/providers)
      for the correct environment variable names for other providers.*

        **Example:**

        ```python
        from google.adk.agents import LlmAgent
        from google.adk.models.lite_llm import LiteLlm

        # --- Example Agent using OpenAI's GPT-4o ---
        # (Requires OPENAI_API_KEY)
        agent_openai = LlmAgent(
            model=LiteLlm(model="openai/gpt-4o"), # LiteLLM model string format
            name="openai_agent",
            instruction="You are a helpful assistant powered by GPT-4o.",
            # ... other agent parameters
        )

        # --- Example Agent using Anthropic's Claude Haiku (non-Vertex) ---
        # (Requires ANTHROPIC_API_KEY)
        agent_claude_direct = LlmAgent(
            model=LiteLlm(model="anthropic/claude-3-haiku-20240307"),
            name="claude_direct_agent",
            instruction="You are an assistant powered by Claude Haiku.",
            # ... other agent parameters
        )
        ```

!!!info "Note for Windows users"

    ### Avoiding LiteLLM UnicodeDecodeError on Windows
    When using ADK agents with LiteLlm on Windows, users might encounter the following error:
    ```
    UnicodeDecodeError: 'charmap' codec can't decode byte...
    ```
    This issue occurs because `litellm` (used by LiteLlm) reads cached files (e.g., model pricing information) using the default Windows encoding (`cp1252`) instead of UTF-8.
    Windows users can prevent this issue by setting the `PYTHONUTF8` environment variable to `1`. This forces Python to use UTF-8 globally.
    **Example (PowerShell):**
    ```powershell
    # Set for current session
    $env:PYTHONUTF8 = "1"
    # Set persistently for the user
    [System.Environment]::SetEnvironmentVariable('PYTHONUTF8', '1', [System.EnvironmentVariableTarget]::User)
    Applying this setting ensures that Python reads cached files using UTF-8, avoiding the decoding error.
    ```


## Using Open & Local Models via LiteLLM

![python_only](https://img.shields.io/badge/Supported_in-Python-blue)

For maximum control, cost savings, privacy, or offline use cases, you can run
open-source models locally or self-host them and integrate them using LiteLLM.

**Integration Method:** Instantiate the `LiteLlm` wrapper class, configured to
point to your local model server.

### Ollama Integration

[Ollama](https://ollama.com/) allows you to easily run open-source models
locally.

#### Model choice

If your agent is relying on tools, please make sure that you select a model with
tool support from [Ollama website](https://ollama.com/search?c=tools).

For reliable results, we recommend using a decent-sized model with tool support.

The tool support for the model can be checked with the following command:

```bash
ollama show mistral-small3.1
  Model
    architecture        mistral3
    parameters          24.0B
    context length      131072
    embedding length    5120
    quantization        Q4_K_M

  Capabilities
    completion
    vision
    tools
```

You are supposed to see `tools` listed under capabilities.

You can also look at the template the model is using and tweak it based on your
needs.

```bash
ollama show --modelfile llama3.2 > model_file_to_modify
```

For instance, the default template for the above model inherently suggests that
the model shall call a function all the time. This may result in an infinite
loop of function calls.

```
Given the following functions, please respond with a JSON for a function call
with its proper arguments that best answers the given prompt.

Respond in the format {"name": function name, "parameters": dictionary of
argument name and its value}. Do not use variables.
```

You can swap such prompts with a more descriptive one to prevent infinite tool
call loops.

For instance:

```
Review the user's prompt and the available functions listed below.
First, determine if calling one of these functions is the most appropriate way to respond. A function call is likely needed if the prompt asks for a specific action, requires external data lookup, or involves calculations handled by the functions. If the prompt is a general question or can be answered directly, a function call is likely NOT needed.

If you determine a function call IS required: Respond ONLY with a JSON object in the format {"name": "function_name", "parameters": {"argument_name": "value"}}. Ensure parameter values are concrete, not variables.

If you determine a function call IS NOT required: Respond directly to the user's prompt in plain text, providing the answer or information requested. Do not output any JSON.
```

Then you can create a new model with the following command:

```bash
ollama create llama3.2-modified -f model_file_to_modify
```

#### Using ollama_chat provider

Our LiteLLM wrapper can be used to create agents with Ollama models.

```py
root_agent = Agent(
    model=LiteLlm(model="ollama_chat/mistral-small3.1"),
    name="dice_agent",
    description=(
        "hello world agent that can roll a dice of 8 sides and check prime"
        " numbers."
    ),
    instruction="""
      You roll dice and answer questions about the outcome of the dice rolls.
    """,
    tools=[
        roll_die,
        check_prime,
    ],
)
```

**It is important to set the provider `ollama_chat` instead of `ollama`. Using
`ollama` will result in unexpected behaviors such as infinite tool call loops
and ignoring previous context.**

While `api_base` can be provided inside LiteLLM for generation, LiteLLM library
is calling other APIs relying on the env variable instead as of v1.65.5 after
completion. So at this time, we recommend setting the env variable
`OLLAMA_API_BASE` to point to the ollama server.

```bash
export OLLAMA_API_BASE="http://localhost:11434"
adk web
```

#### Using openai provider

Alternatively, `openai` can be used as the provider name. But this will also
require setting the `OPENAI_API_BASE=http://localhost:11434/v1` and
`OPENAI_API_KEY=anything` env variables instead of `OLLAMA_API_BASE`. **Please
note that api base now has `/v1` at the end.**

```py
root_agent = Agent(
    model=LiteLlm(model="openai/mistral-small3.1"),
    name="dice_agent",
    description=(
        "hello world agent that can roll a dice of 8 sides and check prime"
        " numbers."
    ),
    instruction="""
      You roll dice and answer questions about the outcome of the dice rolls.
    """,
    tools=[
        roll_die,
        check_prime,
    ],
)
```

```bash
export OPENAI_API_BASE=http://localhost:11434/v1
export OPENAI_API_KEY=anything
adk web
```

#### Debugging

You can see the request sent to the Ollama server by adding the following in
your agent code just after imports.

```py
import litellm
litellm._turn_on_debug()
```

Look for a line like the following:

```bash
Request Sent from LiteLLM:
curl -X POST \
http://localhost:11434/api/chat \
-d '{'model': 'mistral-small3.1', 'messages': [{'role': 'system', 'content': ...
```

### Self-Hosted Endpoint (e.g., vLLM)

![python_only](https://img.shields.io/badge/Supported_in-Python-blue)

Tools such as [vLLM](https://github.com/vllm-project/vllm) allow you to host
models efficiently and often expose an OpenAI-compatible API endpoint.

**Setup:**

1. **Deploy Model:** Deploy your chosen model using vLLM (or a similar tool).
   Note the API base URL (e.g., `https://your-vllm-endpoint.run.app/v1`).
    * *Important for ADK Tools:* When deploying, ensure the serving tool
      supports and enables OpenAI-compatible tool/function calling. For vLLM,
      this might involve flags like `--enable-auto-tool-choice` and potentially
      a specific `--tool-call-parser`, depending on the model. Refer to the vLLM
      documentation on Tool Use.
2. **Authentication:** Determine how your endpoint handles authentication (e.g.,
   API key, bearer token).

    **Integration Example:**

    ```python
    import subprocess
    from google.adk.agents import LlmAgent
    from google.adk.models.lite_llm import LiteLlm

    # --- Example Agent using a model hosted on a vLLM endpoint ---

    # Endpoint URL provided by your vLLM deployment
    api_base_url = "https://your-vllm-endpoint.run.app/v1"

    # Model name as recognized by *your* vLLM endpoint configuration
    model_name_at_endpoint = "hosted_vllm/google/gemma-3-4b-it" # Example from vllm_test.py

    # Authentication (Example: using gcloud identity token for a Cloud Run deployment)
    # Adapt this based on your endpoint's security
    try:
        gcloud_token = subprocess.check_output(
            ["gcloud", "auth", "print-identity-token", "-q"]
        ).decode().strip()
        auth_headers = {"Authorization": f"Bearer {gcloud_token}"}
    except Exception as e:
        print(f"Warning: Could not get gcloud token - {e}. Endpoint might be unsecured or require different auth.")
        auth_headers = None # Or handle error appropriately

    agent_vllm = LlmAgent(
        model=LiteLlm(
            model=model_name_at_endpoint,
            api_base=api_base_url,
            # Pass authentication headers if needed
            extra_headers=auth_headers
            # Alternatively, if endpoint uses an API key:
            # api_key="YOUR_ENDPOINT_API_KEY"
        ),
        name="vllm_agent",
        instruction="You are a helpful assistant running on a self-hosted vLLM endpoint.",
        # ... other agent parameters
    )
    ```

## Using Hosted & Tuned Models on Vertex AI

For enterprise-grade scalability, reliability, and integration with Google
Cloud's MLOps ecosystem, you can use models deployed to Vertex AI Endpoints.
This includes models from Model Garden or your own fine-tuned models.

**Integration Method:** Pass the full Vertex AI Endpoint resource string
(`projects/PROJECT_ID/locations/LOCATION/endpoints/ENDPOINT_ID`) directly to the
`model` parameter of `LlmAgent`.

**Vertex AI Setup (Consolidated):**

Ensure your environment is configured for Vertex AI:

1. **Authentication:** Use Application Default Credentials (ADC):

    ```shell
    gcloud auth application-default login
    ```

2. **Environment Variables:** Set your project and location:

    ```shell
    export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
    export GOOGLE_CLOUD_LOCATION="YOUR_VERTEX_AI_LOCATION" # e.g., us-central1
    ```

3. **Enable Vertex Backend:** Crucially, ensure the `google-genai` library
   targets Vertex AI:

    ```shell
    export GOOGLE_GENAI_USE_VERTEXAI=TRUE
    ```

### Model Garden Deployments

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

You can deploy various open and proprietary models from the
[Vertex AI Model Garden](https://console.cloud.google.com/vertex-ai/model-garden)
to an endpoint.

**Example:**

```python
from google.adk.agents import LlmAgent
from google.genai import types # For config objects

# --- Example Agent using a Llama 3 model deployed from Model Garden ---

# Replace with your actual Vertex AI Endpoint resource name
llama3_endpoint = "projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/YOUR_LLAMA3_ENDPOINT_ID"

agent_llama3_vertex = LlmAgent(
    model=llama3_endpoint,
    name="llama3_vertex_agent",
    instruction="You are a helpful assistant based on Llama 3, hosted on Vertex AI.",
    generate_content_config=types.GenerateContentConfig(max_output_tokens=2048),
    # ... other agent parameters
)
```

### Fine-tuned Model Endpoints

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

Deploying your fine-tuned models (whether based on Gemini or other architectures
supported by Vertex AI) results in an endpoint that can be used directly.

**Example:**

```python
from google.adk.agents import LlmAgent

# --- Example Agent using a fine-tuned Gemini model endpoint ---

# Replace with your fine-tuned model's endpoint resource name
finetuned_gemini_endpoint = "projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/YOUR_FINETUNED_ENDPOINT_ID"

agent_finetuned_gemini = LlmAgent(
    model=finetuned_gemini_endpoint,
    name="finetuned_gemini_agent",
    instruction="You are a specialized assistant trained on specific data.",
    # ... other agent parameters
)
```

### Third-Party Models on Vertex AI (e.g., Anthropic Claude)

Some providers, like Anthropic, make their models available directly through
Vertex AI.

=== "Python"

    **Integration Method:** Uses the direct model string (e.g.,
    `"claude-3-sonnet@20240229"`), *but requires manual registration* within ADK.
    
    **Why Registration?** ADK's registry automatically recognizes `gemini-*` strings
    and standard Vertex AI endpoint strings (`projects/.../endpoints/...`) and
    routes them via the `google-genai` library. For other model types used directly
    via Vertex AI (like Claude), you must explicitly tell the ADK registry which
    specific wrapper class (`Claude` in this case) knows how to handle that model
    identifier string with the Vertex AI backend.
    
    **Setup:**
    
    1. **Vertex AI Environment:** Ensure the consolidated Vertex AI setup (ADC, Env
       Vars, `GOOGLE_GENAI_USE_VERTEXAI=TRUE`) is complete.
    
    2. **Install Provider Library:** Install the necessary client library configured
       for Vertex AI.
    
        ```shell
        pip install "anthropic[vertex]"
        ```
    
    3. **Register Model Class:** Add this code near the start of your application,
       *before* creating an agent using the Claude model string:
    
        ```python
        # Required for using Claude model strings directly via Vertex AI with LlmAgent
        from google.adk.models.anthropic_llm import Claude
        from google.adk.models.registry import LLMRegistry
    
        LLMRegistry.register(Claude)
        ```
    
       **Example:**

       ```python
       from google.adk.agents import LlmAgent
       from google.adk.models.anthropic_llm import Claude # Import needed for registration
       from google.adk.models.registry import LLMRegistry # Import needed for registration
       from google.genai import types
        
       # --- Register Claude class (do this once at startup) ---
       LLMRegistry.register(Claude)
        
       # --- Example Agent using Claude 3 Sonnet on Vertex AI ---
        
       # Standard model name for Claude 3 Sonnet on Vertex AI
       claude_model_vertexai = "claude-3-sonnet@20240229"
        
       agent_claude_vertexai = LlmAgent(
           model=claude_model_vertexai, # Pass the direct string after registration
           name="claude_vertexai_agent",
           instruction="You are an assistant powered by Claude 3 Sonnet on Vertex AI.",
           generate_content_config=types.GenerateContentConfig(max_output_tokens=4096),
           # ... other agent parameters
       )
       ```

=== "Java"

    **Integration Method:** Directly instantiate the provider-specific model class (e.g., `com.google.adk.models.Claude`) and configure it with a Vertex AI backend.
    
    **Why Direct Instantiation?** The Java ADK's `LlmRegistry` primarily handles Gemini models by default. For third-party models like Claude on Vertex AI, you directly provide an instance of the ADK's wrapper class (e.g., `Claude`) to the `LlmAgent`. This wrapper class is responsible for interacting with the model via its specific client library, configured for Vertex AI.
    
    **Setup:**
    
    1.  **Vertex AI Environment:**
        *   Ensure your Google Cloud project and region are correctly set up.
        *   **Application Default Credentials (ADC):** Make sure ADC is configured correctly in your environment. This is typically done by running `gcloud auth application-default login`. The Java client libraries will use these credentials to authenticate with Vertex AI. Follow the [Google Cloud Java documentation on ADC](https://cloud.google.com/java/docs/reference/google-auth-library/latest/com.google.auth.oauth2.GoogleCredentials#com_google_auth_oauth2_GoogleCredentials_getApplicationDefault__) for detailed setup.
    
    2.  **Provider Library Dependencies:**
        *   **Third-Party Client Libraries (Often Transitive):** The ADK core library often includes the necessary client libraries for common third-party models on Vertex AI (like Anthropic's required classes) as **transitive dependencies**. This means you might not need to explicitly add a separate dependency for the Anthropic Vertex SDK in your `pom.xml` or `build.gradle`.

    3.  **Instantiate and Configure the Model:**
        When creating your `LlmAgent`, instantiate the `Claude` class (or the equivalent for another provider) and configure its `VertexBackend`.
    
    **Example:**

    ```java
    import com.anthropic.client.AnthropicClient;
    import com.anthropic.client.okhttp.AnthropicOkHttpClient;
    import com.anthropic.vertex.backends.VertexBackend;
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.models.Claude; // ADK's wrapper for Claude
    import com.google.auth.oauth2.GoogleCredentials;
    import java.io.IOException;

    // ... other imports

    public class ClaudeVertexAiAgent {

        public static LlmAgent createAgent() throws IOException {
            // Model name for Claude 3 Sonnet on Vertex AI (or other versions)
            String claudeModelVertexAi = "claude-3-7-sonnet"; // Or any other Claude model

            // Configure the AnthropicOkHttpClient with the VertexBackend
            AnthropicClient anthropicClient = AnthropicOkHttpClient.builder()
                .backend(
                    VertexBackend.builder()
                        .region("us-east5") // Specify your Vertex AI region
                        .project("your-gcp-project-id") // Specify your GCP Project ID
                        .googleCredentials(GoogleCredentials.getApplicationDefault())
                        .build())
                .build();

            // Instantiate LlmAgent with the ADK Claude wrapper
            LlmAgent agentClaudeVertexAi = LlmAgent.builder()
                .model(new Claude(claudeModelVertexAi, anthropicClient)) // Pass the Claude instance
                .name("claude_vertexai_agent")
                .instruction("You are an assistant powered by Claude 3 Sonnet on Vertex AI.")
                // .generateContentConfig(...) // Optional: Add generation config if needed
                // ... other agent parameters
                .build();
            
            return agentClaudeVertexAi;
        }

        public static void main(String[] args) {
            try {
                LlmAgent agent = createAgent();
                System.out.println("Successfully created agent: " + agent.name());
                // Here you would typically set up a Runner and Session to interact with the agent
            } catch (IOException e) {
                System.err.println("Failed to create agent: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
    ```


================================================
FILE: docs/agents/multi-agents.md
================================================
# Multi-Agent Systems in ADK

As agentic applications grow in complexity, structuring them as a single, monolithic agent can become challenging to develop, maintain, and reason about. The Agent Development Kit (ADK) supports building sophisticated applications by composing multiple, distinct `BaseAgent` instances into a **Multi-Agent System (MAS)**.

In ADK, a multi-agent system is an application where different agents, often forming a hierarchy, collaborate or coordinate to achieve a larger goal. Structuring your application this way offers significant advantages, including enhanced modularity, specialization, reusability, maintainability, and the ability to define structured control flows using dedicated workflow agents.

You can compose various types of agents derived from `BaseAgent` to build these systems:

* **LLM Agents:** Agents powered by large language models. (See [LLM Agents](llm-agents.md))
* **Workflow Agents:** Specialized agents (`SequentialAgent`, `ParallelAgent`, `LoopAgent`) designed to manage the execution flow of their sub-agents. (See [Workflow Agents](workflow-agents/index.md))
* **Custom agents:** Your own agents inheriting from `BaseAgent` with specialized, non-LLM logic. (See [Custom Agents](custom-agents.md))

The following sections detail the core ADK primitives—such as agent hierarchy, workflow agents, and interaction mechanisms—that enable you to construct and manage these multi-agent systems effectively.

## 1. ADK Primitives for Agent Composition

ADK provides core building blocks—primitives—that enable you to structure and manage interactions within your multi-agent system.

!!! Note
    The specific parameters or method names for the primitives may vary slightly by SDK language (e.g., `sub_agents` in Python, `subAgents` in Java). Refer to the language-specific API documentation for details.

### 1.1. Agent Hierarchy (Parent agent, Sub Agents)

The foundation for structuring multi-agent systems is the parent-child relationship defined in `BaseAgent`.

* **Establishing Hierarchy:** You create a tree structure by passing a list of agent instances to the `sub_agents` argument when initializing a parent agent. ADK automatically sets the `parent_agent` attribute on each child agent during initialization.
* **Single Parent Rule:** An agent instance can only be added as a sub-agent once. Attempting to assign a second parent will result in a `ValueError`.
* **Importance:** This hierarchy defines the scope for [Workflow Agents](#12-workflow-agents-as-orchestrators) and influences the potential targets for LLM-Driven Delegation. You can navigate the hierarchy using `agent.parent_agent` or find descendants using `agent.find_agent(name)`.

=== "Python"

    ```python
    # Conceptual Example: Defining Hierarchy
    from google.adk.agents import LlmAgent, BaseAgent
    
    # Define individual agents
    greeter = LlmAgent(name="Greeter", model="gemini-2.0-flash")
    task_doer = BaseAgent(name="TaskExecutor") # Custom non-LLM agent
    
    # Create parent agent and assign children via sub_agents
    coordinator = LlmAgent(
        name="Coordinator",
        model="gemini-2.0-flash",
        description="I coordinate greetings and tasks.",
        sub_agents=[ # Assign sub_agents here
            greeter,
            task_doer
        ]
    )
    
    # Framework automatically sets:
    # assert greeter.parent_agent == coordinator
    # assert task_doer.parent_agent == coordinator
    ```

=== "Java"

    ```java
    // Conceptual Example: Defining Hierarchy
    import com.google.adk.agents.SequentialAgent;
    import com.google.adk.agents.LlmAgent;
    
    // Define individual agents
    LlmAgent greeter = LlmAgent.builder().name("Greeter").model("gemini-2.0-flash").build();
    SequentialAgent taskDoer = SequentialAgent.builder().name("TaskExecutor").subAgents(...).build(); // Sequential Agent
    
    // Create parent agent and assign sub_agents
    LlmAgent coordinator = LlmAgent.builder()
        .name("Coordinator")
        .model("gemini-2.0-flash")
        .description("I coordinate greetings and tasks")
        .subAgents(greeter, taskDoer) // Assign sub_agents here
        .build();
    
    // Framework automatically sets:
    // assert greeter.parentAgent().equals(coordinator);
    // assert taskDoer.parentAgent().equals(coordinator);
    ```

### 1.2. Workflow Agents as Orchestrators

ADK includes specialized agents derived from `BaseAgent` that don't perform tasks themselves but orchestrate the execution flow of their `sub_agents`.

* **[`SequentialAgent`](workflow-agents/sequential-agents.md):** Executes its `sub_agents` one after another in the order they are listed.
    * **Context:** Passes the *same* [`InvocationContext`](../runtime/index.md) sequentially, allowing agents to easily pass results via shared state.

=== "Python"

    ```python
    # Conceptual Example: Sequential Pipeline
    from google.adk.agents import SequentialAgent, LlmAgent

    step1 = LlmAgent(name="Step1_Fetch", output_key="data") # Saves output to state['data']
    step2 = LlmAgent(name="Step2_Process", instruction="Process data from {data}.")

    pipeline = SequentialAgent(name="MyPipeline", sub_agents=[step1, step2])
    # When pipeline runs, Step2 can access the state['data'] set by Step1.
    ```

=== "Java"

    ```java
    // Conceptual Example: Sequential Pipeline
    import com.google.adk.agents.SequentialAgent;
    import com.google.adk.agents.LlmAgent;

    LlmAgent step1 = LlmAgent.builder().name("Step1_Fetch").outputKey("data").build(); // Saves output to state.get("data")
    LlmAgent step2 = LlmAgent.builder().name("Step2_Process").instruction("Process data from {data}.").build();

    SequentialAgent pipeline = SequentialAgent.builder().name("MyPipeline").subAgents(step1, step2).build();
    // When pipeline runs, Step2 can access the state.get("data") set by Step1.
    ```

* **[`ParallelAgent`](workflow-agents/parallel-agents.md):** Executes its `sub_agents` in parallel. Events from sub-agents may be interleaved.
    * **Context:** Modifies the `InvocationContext.branch` for each child agent (e.g., `ParentBranch.ChildName`), providing a distinct contextual path which can be useful for isolating history in some memory implementations.
    * **State:** Despite different branches, all parallel children access the *same shared* `session.state`, enabling them to read initial state and write results (use distinct keys to avoid race conditions).

=== "Python"

    ```python
    # Conceptual Example: Parallel Execution
    from google.adk.agents import ParallelAgent, LlmAgent

    fetch_weather = LlmAgent(name="WeatherFetcher", output_key="weather")
    fetch_news = LlmAgent(name="NewsFetcher", output_key="news")

    gatherer = ParallelAgent(name="InfoGatherer", sub_agents=[fetch_weather, fetch_news])
    # When gatherer runs, WeatherFetcher and NewsFetcher run concurrently.
    # A subsequent agent could read state['weather'] and state['news'].
    ```
  
=== "Java"

    ```java
    // Conceptual Example: Parallel Execution
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.agents.ParallelAgent;
   
    LlmAgent fetchWeather = LlmAgent.builder()
        .name("WeatherFetcher")
        .outputKey("weather")
        .build();
    
    LlmAgent fetchNews = LlmAgent.builder()
        .name("NewsFetcher")
        .instruction("news")
        .build();
    
    ParallelAgent gatherer = ParallelAgent.builder()
        .name("InfoGatherer")
        .subAgents(fetchWeather, fetchNews)
        .build();
    
    // When gatherer runs, WeatherFetcher and NewsFetcher run concurrently.
    // A subsequent agent could read state['weather'] and state['news'].
    ```

  * **[`LoopAgent`](workflow-agents/loop-agents.md):** Executes its `sub_agents` sequentially in a loop.
      * **Termination:** The loop stops if the optional `max_iterations` is reached, or if any sub-agent returns an [`Event`](../events/index.md) with `escalate=True` in it's Event Actions.
      * **Context & State:** Passes the *same* `InvocationContext` in each iteration, allowing state changes (e.g., counters, flags) to persist across loops.

=== "Python"

      ```python
      # Conceptual Example: Loop with Condition
      from google.adk.agents import LoopAgent, LlmAgent, BaseAgent
      from google.adk.events import Event, EventActions
      from google.adk.agents.invocation_context import InvocationContext
      from typing import AsyncGenerator

      class CheckCondition(BaseAgent): # Custom agent to check state
          async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:
              status = ctx.session.state.get("status", "pending")
              is_done = (status == "completed")
              yield Event(author=self.name, actions=EventActions(escalate=is_done)) # Escalate if done

      process_step = LlmAgent(name="ProcessingStep") # Agent that might update state['status']

      poller = LoopAgent(
          name="StatusPoller",
          max_iterations=10,
          sub_agents=[process_step, CheckCondition(name="Checker")]
      )
      # When poller runs, it executes process_step then Checker repeatedly
      # until Checker escalates (state['status'] == 'completed') or 10 iterations pass.
      ```
    
=== "Java"

    ```java
    // Conceptual Example: Loop with Condition
    // Custom agent to check state and potentially escalate
    public static class CheckConditionAgent extends BaseAgent {
      public CheckConditionAgent(String name, String description) {
        super(name, description, List.of(), null, null);
      }
  
      @Override
      protected Flowable<Event> runAsyncImpl(InvocationContext ctx) {
        String status = (String) ctx.session().state().getOrDefault("status", "pending");
        boolean isDone = "completed".equalsIgnoreCase(status);

        // Emit an event that signals to escalate (exit the loop) if the condition is met.
        // If not done, the escalate flag will be false or absent, and the loop continues.
        Event checkEvent = Event.builder()
                .author(name())
                .id(Event.generateEventId()) // Important to give events unique IDs
                .actions(EventActions.builder().escalate(isDone).build()) // Escalate if done
                .build();
        return Flowable.just(checkEvent);
      }
    }
  
    // Agent that might update state.put("status")
    LlmAgent processingStepAgent = LlmAgent.builder().name("ProcessingStep").build();
    // Custom agent instance for checking the condition
    CheckConditionAgent conditionCheckerAgent = new CheckConditionAgent(
        "ConditionChecker",
        "Checks if the status is 'completed'."
    );
    LoopAgent poller = LoopAgent.builder().name("StatusPoller").maxIterations(10).subAgents(processingStepAgent, conditionCheckerAgent).build();
    // When poller runs, it executes processingStepAgent then conditionCheckerAgent repeatedly
    // until Checker escalates (state.get("status") == "completed") or 10 iterations pass.
    ```

### 1.3. Interaction & Communication Mechanisms

Agents within a system often need to exchange data or trigger actions in one another. ADK facilitates this through:

#### a) Shared Session State (`session.state`)

The most fundamental way for agents operating within the same invocation (and thus sharing the same [`Session`](../sessions/session.md) object via the `InvocationContext`) to communicate passively.

* **Mechanism:** One agent (or its tool/callback) writes a value (`context.state['data_key'] = processed_data`), and a subsequent agent reads it (`data = context.state.get('data_key')`). State changes are tracked via [`CallbackContext`](../callbacks/index.md).
* **Convenience:** The `output_key` property on [`LlmAgent`](llm-agents.md) automatically saves the agent's final response text (or structured output) to the specified state key.
* **Nature:** Asynchronous, passive communication. Ideal for pipelines orchestrated by `SequentialAgent` or passing data across `LoopAgent` iterations.
* **See Also:** [State Management](../sessions/state.md)

=== "Python"

    ```python
    # Conceptual Example: Using output_key and reading state
    from google.adk.agents import LlmAgent, SequentialAgent
    
    agent_A = LlmAgent(name="AgentA", instruction="Find the capital of France.", output_key="capital_city")
    agent_B = LlmAgent(name="AgentB", instruction="Tell me about the city stored in {capital_city}.")
    
    pipeline = SequentialAgent(name="CityInfo", sub_agents=[agent_A, agent_B])
    # AgentA runs, saves "Paris" to state['capital_city'].
    # AgentB runs, its instruction processor reads state['capital_city'] to get "Paris".
    ```

=== "Java"

    ```java
    // Conceptual Example: Using outputKey and reading state
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.agents.SequentialAgent;
    
    LlmAgent agentA = LlmAgent.builder()
        .name("AgentA")
        .instruction("Find the capital of France.")
        .outputKey("capital_city")
        .build();
    
    LlmAgent agentB = LlmAgent.builder()
        .name("AgentB")
        .instruction("Tell me about the city stored in {capital_city}.")
        .outputKey("capital_city")
        .build();
    
    SequentialAgent pipeline = SequentialAgent.builder().name("CityInfo").subAgents(agentA, agentB).build();
    // AgentA runs, saves "Paris" to state('capital_city').
    // AgentB runs, its instruction processor reads state.get("capital_city") to get "Paris".
    ```

#### b) LLM-Driven Delegation (Agent Transfer)

Leverages an [`LlmAgent`](llm-agents.md)'s understanding to dynamically route tasks to other suitable agents within the hierarchy.

* **Mechanism:** The agent's LLM generates a specific function call: `transfer_to_agent(agent_name='target_agent_name')`.
* **Handling:** The `AutoFlow`, used by default when sub-agents are present or transfer isn't disallowed, intercepts this call. It identifies the target agent using `root_agent.find_agent()` and updates the `InvocationContext` to switch execution focus.
* **Requires:** The calling `LlmAgent` needs clear `instructions` on when to transfer, and potential target agents need distinct `description`s for the LLM to make informed decisions. Transfer scope (parent, sub-agent, siblings) can be configured on the `LlmAgent`.
* **Nature:** Dynamic, flexible routing based on LLM interpretation.

=== "Python"

    ```python
    # Conceptual Setup: LLM Transfer
    from google.adk.agents import LlmAgent
    
    booking_agent = LlmAgent(name="Booker", description="Handles flight and hotel bookings.")
    info_agent = LlmAgent(name="Info", description="Provides general information and answers questions.")
    
    coordinator = LlmAgent(
        name="Coordinator",
        model="gemini-2.0-flash",
        instruction="You are an assistant. Delegate booking tasks to Booker and info requests to Info.",
        description="Main coordinator.",
        # AutoFlow is typically used implicitly here
        sub_agents=[booking_agent, info_agent]
    )
    # If coordinator receives "Book a flight", its LLM should generate:
    # FunctionCall(name='transfer_to_agent', args={'agent_name': 'Booker'})
    # ADK framework then routes execution to booking_agent.
    ```

=== "Java"

    ```java
    // Conceptual Setup: LLM Transfer
    import com.google.adk.agents.LlmAgent;
    
    LlmAgent bookingAgent = LlmAgent.builder()
        .name("Booker")
        .description("Handles flight and hotel bookings.")
        .build();
    
    LlmAgent infoAgent = LlmAgent.builder()
        .name("Info")
        .description("Provides general information and answers questions.")
        .build();
    
    // Define the coordinator agent
    LlmAgent coordinator = LlmAgent.builder()
        .name("Coordinator")
        .model("gemini-2.0-flash") // Or your desired model
        .instruction("You are an assistant. Delegate booking tasks to Booker and info requests to Info.")
        .description("Main coordinator.")
        // AutoFlow will be used by default (implicitly) because subAgents are present
        // and transfer is not disallowed.
        .subAgents(bookingAgent, infoAgent)
        .build();

    // If coordinator receives "Book a flight", its LLM should generate:
    // FunctionCall.builder.name("transferToAgent").args(ImmutableMap.of("agent_name", "Booker")).build()
    // ADK framework then routes execution to bookingAgent.
    ```

#### c) Explicit Invocation (`AgentTool`)

Allows an [`LlmAgent`](llm-agents.md) to treat another `BaseAgent` instance as a callable function or [Tool](../tools/index.md).

* **Mechanism:** Wrap the target agent instance in `AgentTool` and include it in the parent `LlmAgent`'s `tools` list. `AgentTool` generates a corresponding function declaration for the LLM.
* **Handling:** When the parent LLM generates a function call targeting the `AgentTool`, the framework executes `AgentTool.run_async`. This method runs the target agent, captures its final response, forwards any state/artifact changes back to the parent's context, and returns the response as the tool's result.
* **Nature:** Synchronous (within the parent's flow), explicit, controlled invocation like any other tool.
* **(Note:** `AgentTool` needs to be imported and used explicitly).

=== "Python"

    ```python
    # Conceptual Setup: Agent as a Tool
    from google.adk.agents import LlmAgent, BaseAgent
    from google.adk.tools import agent_tool
    from pydantic import BaseModel
    
    # Define a target agent (could be LlmAgent or custom BaseAgent)
    class ImageGeneratorAgent(BaseAgent): # Example custom agent
        name: str = "ImageGen"
        description: str = "Generates an image based on a prompt."
        # ... internal logic ...
        async def _run_async_impl(self, ctx): # Simplified run logic
            prompt = ctx.session.state.get("image_prompt", "default prompt")
            # ... generate image bytes ...
            image_bytes = b"..."
            yield Event(author=self.name, content=types.Content(parts=[types.Part.from_bytes(image_bytes, "image/png")]))
    
    image_agent = ImageGeneratorAgent()
    image_tool = agent_tool.AgentTool(agent=image_agent) # Wrap the agent
    
    # Parent agent uses the AgentTool
    artist_agent = LlmAgent(
        name="Artist",
        model="gemini-2.0-flash",
        instruction="Create a prompt and use the ImageGen tool to generate the image.",
        tools=[image_tool] # Include the AgentTool
    )
    # Artist LLM generates a prompt, then calls:
    # FunctionCall(name='ImageGen', args={'image_prompt': 'a cat wearing a hat'})
    # Framework calls image_tool.run_async(...), which runs ImageGeneratorAgent.
    # The resulting image Part is returned to the Artist agent as the tool result.
    ```

=== "Java"

    ```java
    // Conceptual Setup: Agent as a Tool
    import com.google.adk.agents.BaseAgent;
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.tools.AgentTool;

    // Example custom agent (could be LlmAgent or custom BaseAgent)
    public class ImageGeneratorAgent extends BaseAgent  {
    
      public ImageGeneratorAgent(String name, String description) {
        super(name, description, List.of(), null, null);
      }
    
      // ... internal logic ...
      @Override
      protected Flowable<Event> runAsyncImpl(InvocationContext invocationContext) { // Simplified run logic
        invocationContext.session().state().get("image_prompt");
        // Generate image bytes
        // ...
    
        Event responseEvent = Event.builder()
            .author(this.name())
            .content(Content.fromParts(Part.fromText("\b...")))
            .build();
    
        return Flowable.just(responseEvent);
      }
    
      @Override
      protected Flowable<Event> runLiveImpl(InvocationContext invocationContext) {
        return null;
      }
    }

    // Wrap the agent using AgentTool
    ImageGeneratorAgent imageAgent = new ImageGeneratorAgent("image_agent", "generates images");
    AgentTool imageTool = AgentTool.create(imageAgent);
    
    // Parent agent uses the AgentTool
    LlmAgent artistAgent = LlmAgent.builder()
            .name("Artist")
            .model("gemini-2.0-flash")
            .instruction(
                    "You are an artist. Create a detailed prompt for an image and then " +
                            "use the 'ImageGen' tool to generate the image. " +
                            "The 'ImageGen' tool expects a single string argument named 'request' " +
                            "containing the image prompt. The tool will return a JSON string in its " +
                            "'result' field, containing 'image_base64', 'mime_type', and 'status'."
            )
            .description("An agent that can create images using a generation tool.")
            .tools(imageTool) // Include the AgentTool
            .build();
    
    // Artist LLM generates a prompt, then calls:
    // FunctionCall(name='ImageGen', args={'imagePrompt': 'a cat wearing a hat'})
    // Framework calls imageTool.runAsync(...), which runs ImageGeneratorAgent.
    // The resulting image Part is returned to the Artist agent as the tool result.
    ```

These primitives provide the flexibility to design multi-agent interactions ranging from tightly coupled sequential workflows to dynamic, LLM-driven delegation networks.

## 2. Common Multi-Agent Patterns using ADK Primitives

By combining ADK's composition primitives, you can implement various established patterns for multi-agent collaboration.

### Coordinator/Dispatcher Pattern

* **Structure:** A central [`LlmAgent`](llm-agents.md) (Coordinator) manages several specialized `sub_agents`.
* **Goal:** Route incoming requests to the appropriate specialist agent.
* **ADK Primitives Used:**
    * **Hierarchy:** Coordinator has specialists listed in `sub_agents`.
    * **Interaction:** Primarily uses **LLM-Driven Delegation** (requires clear `description`s on sub-agents and appropriate `instruction` on Coordinator) or **Explicit Invocation (`AgentTool`)** (Coordinator includes `AgentTool`-wrapped specialists in its `tools`).

=== "Python"

    ```python
    # Conceptual Code: Coordinator using LLM Transfer
    from google.adk.agents import LlmAgent
    
    billing_agent = LlmAgent(name="Billing", description="Handles billing inquiries.")
    support_agent = LlmAgent(name="Support", description="Handles technical support requests.")
    
    coordinator = LlmAgent(
        name="HelpDeskCoordinator",
        model="gemini-2.0-flash",
        instruction="Route user requests: Use Billing agent for payment issues, Support agent for technical problems.",
        description="Main help desk router.",
        # allow_transfer=True is often implicit with sub_agents in AutoFlow
        sub_agents=[billing_agent, support_agent]
    )
    # User asks "My payment failed" -> Coordinator's LLM should call transfer_to_agent(agent_name='Billing')
    # User asks "I can't log in" -> Coordinator's LLM should call transfer_to_agent(agent_name='Support')
    ```

=== "Java"

    ```java
    // Conceptual Code: Coordinator using LLM Transfer
    import com.google.adk.agents.LlmAgent;

    LlmAgent billingAgent = LlmAgent.builder()
        .name("Billing")
        .description("Handles billing inquiries and payment issues.")
        .build();

    LlmAgent supportAgent = LlmAgent.builder()
        .name("Support")
        .description("Handles technical support requests and login problems.")
        .build();

    LlmAgent coordinator = LlmAgent.builder()
        .name("HelpDeskCoordinator")
        .model("gemini-2.0-flash")
        .instruction("Route user requests: Use Billing agent for payment issues, Support agent for technical problems.")
        .description("Main help desk router.")
        .subAgents(billingAgent, supportAgent)
        // Agent transfer is implicit with sub agents in the Autoflow, unless specified
        // using .disallowTransferToParent or disallowTransferToPeers
        .build();

    // User asks "My payment failed" -> Coordinator's LLM should call
    // transferToAgent(agentName='Billing')
    // User asks "I can't log in" -> Coordinator's LLM should call
    // transferToAgent(agentName='Support')
    ```

### Sequential Pipeline Pattern

* **Structure:** A [`SequentialAgent`](workflow-agents/sequential-agents.md) contains `sub_agents` executed in a fixed order.
* **Goal:** Implement a multi-step process where the output of one step feeds into the next.
* **ADK Primitives Used:**
    * **Workflow:** `SequentialAgent` defines the order.
    * **Communication:** Primarily uses **Shared Session State**. Earlier agents write results (often via `output_key`), later agents read those results from `context.state`.

=== "Python"

    ```python
    # Conceptual Code: Sequential Data Pipeline
    from google.adk.agents import SequentialAgent, LlmAgent
    
    validator = LlmAgent(name="ValidateInput", instruction="Validate the input.", output_key="validation_status")
    processor = LlmAgent(name="ProcessData", instruction="Process data if {validation_status} is 'valid'.", output_key="result")
    reporter = LlmAgent(name="ReportResult", instruction="Report the result from {result}.")
    
    data_pipeline = SequentialAgent(
        name="DataPipeline",
        sub_agents=[validator, processor, reporter]
    )
    # validator runs -> saves to state['validation_status']
    # processor runs -> reads state['validation_status'], saves to state['result']
    # reporter runs -> reads state['result']
    ```

=== "Java"

    ```java
    // Conceptual Code: Sequential Data Pipeline
    import com.google.adk.agents.SequentialAgent;
    
    LlmAgent validator = LlmAgent.builder()
        .name("ValidateInput")
        .instruction("Validate the input")
        .outputKey("validation_status") // Saves its main text output to session.state["validation_status"]
        .build();
    
    LlmAgent processor = LlmAgent.builder()
        .name("ProcessData")
        .instruction("Process data if {validation_status} is 'valid'")
        .outputKey("result") // Saves its main text output to session.state["result"]
        .build();
    
    LlmAgent reporter = LlmAgent.builder()
        .name("ReportResult")
        .instruction("Report the result from {result}")
        .build();
    
    SequentialAgent dataPipeline = SequentialAgent.builder()
        .name("DataPipeline")
        .subAgents(validator, processor, reporter)
        .build();
    
    // validator runs -> saves to state['validation_status']
    // processor runs -> reads state['validation_status'], saves to state['result']
    // reporter runs -> reads state['result']
    ```

### Parallel Fan-Out/Gather Pattern

* **Structure:** A [`ParallelAgent`](workflow-agents/parallel-agents.md) runs multiple `sub_agents` concurrently, often followed by a later agent (in a `SequentialAgent`) that aggregates results.
* **Goal:** Execute independent tasks simultaneously to reduce latency, then combine their outputs.
* **ADK Primitives Used:**
    * **Workflow:** `ParallelAgent` for concurrent execution (Fan-Out). Often nested within a `SequentialAgent` to handle the subsequent aggregation step (Gather).
    * **Communication:** Sub-agents write results to distinct keys in **Shared Session State**. The subsequent "Gather" agent reads multiple state keys.

=== "Python"

    ```python
    # Conceptual Code: Parallel Information Gathering
    from google.adk.agents import SequentialAgent, ParallelAgent, LlmAgent
    
    fetch_api1 = LlmAgent(name="API1Fetcher", instruction="Fetch data from API 1.", output_key="api1_data")
    fetch_api2 = LlmAgent(name="API2Fetcher", instruction="Fetch data from API 2.", output_key="api2_data")
    
    gather_concurrently = ParallelAgent(
        name="ConcurrentFetch",
        sub_agents=[fetch_api1, fetch_api2]
    )
    
    synthesizer = LlmAgent(
        name="Synthesizer",
        instruction="Combine results from {api1_data} and {api2_data}."
    )
    
    overall_workflow = SequentialAgent(
        name="FetchAndSynthesize",
        sub_agents=[gather_concurrently, synthesizer] # Run parallel fetch, then synthesize
    )
    # fetch_api1 and fetch_api2 run concurrently, saving to state.
    # synthesizer runs afterwards, reading state['api1_data'] and state['api2_data'].
    ```
=== "Java"

    ```java
    // Conceptual Code: Parallel Information Gathering
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.agents.ParallelAgent;
    import com.google.adk.agents.SequentialAgent;

    LlmAgent fetchApi1 = LlmAgent.builder()
        .name("API1Fetcher")
        .instruction("Fetch data from API 1.")
        .outputKey("api1_data")
        .build();

    LlmAgent fetchApi2 = LlmAgent.builder()
        .name("API2Fetcher")
        .instruction("Fetch data from API 2.")
        .outputKey("api2_data")
        .build();

    ParallelAgent gatherConcurrently = ParallelAgent.builder()
        .name("ConcurrentFetcher")
        .subAgents(fetchApi2, fetchApi1)
        .build();

    LlmAgent synthesizer = LlmAgent.builder()
        .name("Synthesizer")
        .instruction("Combine results from {api1_data} and {api2_data}.")
        .build();

    SequentialAgent overallWorfklow = SequentialAgent.builder()
        .name("FetchAndSynthesize") // Run parallel fetch, then synthesize
        .subAgents(gatherConcurrently, synthesizer)
        .build();

    // fetch_api1 and fetch_api2 run concurrently, saving to state.
    // synthesizer runs afterwards, reading state['api1_data'] and state['api2_data'].
    ```


### Hierarchical Task Decomposition

* **Structure:** A multi-level tree of agents where higher-level agents break down complex goals and delegate sub-tasks to lower-level agents.
* **Goal:** Solve complex problems by recursively breaking them down into simpler, executable steps.
* **ADK Primitives Used:**
    * **Hierarchy:** Multi-level `parent_agent`/`sub_agents` structure.
    * **Interaction:** Primarily **LLM-Driven Delegation** or **Explicit Invocation (`AgentTool`)** used by parent agents to assign tasks to subagents. Results are returned up the hierarchy (via tool responses or state).

=== "Python"

    ```python
    # Conceptual Code: Hierarchical Research Task
    from google.adk.agents import LlmAgent
    from google.adk.tools import agent_tool
    
    # Low-level tool-like agents
    web_searcher = LlmAgent(name="WebSearch", description="Performs web searches for facts.")
    summarizer = LlmAgent(name="Summarizer", description="Summarizes text.")
    
    # Mid-level agent combining tools
    research_assistant = LlmAgent(
        name="ResearchAssistant",
        model="gemini-2.0-flash",
        description="Finds and summarizes information on a topic.",
        tools=[agent_tool.AgentTool(agent=web_searcher), agent_tool.AgentTool(agent=summarizer)]
    )
    
    # High-level agent delegating research
    report_writer = LlmAgent(
        name="ReportWriter",
        model="gemini-2.0-flash",
        instruction="Write a report on topic X. Use the ResearchAssistant to gather information.",
        tools=[agent_tool.AgentTool(agent=research_assistant)]
        # Alternatively, could use LLM Transfer if research_assistant is a sub_agent
    )
    # User interacts with ReportWriter.
    # ReportWriter calls ResearchAssistant tool.
    # ResearchAssistant calls WebSearch and Summarizer tools.
    # Results flow back up.
    ```

=== "Java"

    ```java
    // Conceptual Code: Hierarchical Research Task
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.tools.AgentTool;
    
    // Low-level tool-like agents
    LlmAgent webSearcher = LlmAgent.builder()
        .name("WebSearch")
        .description("Performs web searches for facts.")
        .build();
    
    LlmAgent summarizer = LlmAgent.builder()
        .name("Summarizer")
        .description("Summarizes text.")
        .build();
    
    // Mid-level agent combining tools
    LlmAgent researchAssistant = LlmAgent.builder()
        .name("ResearchAssistant")
        .model("gemini-2.0-flash")
        .description("Finds and summarizes information on a topic.")
        .tools(AgentTool.create(webSearcher), AgentTool.create(summarizer))
        .build();
    
    // High-level agent delegating research
    LlmAgent reportWriter = LlmAgent.builder()
        .name("ReportWriter")
        .model("gemini-2.0-flash")
        .instruction("Write a report on topic X. Use the ResearchAssistant to gather information.")
        .tools(AgentTool.create(researchAssistant))
        // Alternatively, could use LLM Transfer if research_assistant is a subAgent
        .build();
    
    // User interacts with ReportWriter.
    // ReportWriter calls ResearchAssistant tool.
    // ResearchAssistant calls WebSearch and Summarizer tools.
    // Results flow back up.
    ```

### Review/Critique Pattern (Generator-Critic)

* **Structure:** Typically involves two agents within a [`SequentialAgent`](workflow-agents/sequential-agents.md): a Generator and a Critic/Reviewer.
* **Goal:** Improve the quality or validity of generated output by having a dedicated agent review it.
* **ADK Primitives Used:**
    * **Workflow:** `SequentialAgent` ensures generation happens before review.
    * **Communication:** **Shared Session State** (Generator uses `output_key` to save output; Reviewer reads that state key). The Reviewer might save its feedback to another state key for subsequent steps.

=== "Python"

    ```python
    # Conceptual Code: Generator-Critic
    from google.adk.agents import SequentialAgent, LlmAgent
    
    generator = LlmAgent(
        name="DraftWriter",
        instruction="Write a short paragraph about subject X.",
        output_key="draft_text"
    )
    
    reviewer = LlmAgent(
        name="FactChecker",
        instruction="Review the text in {draft_text} for factual accuracy. Output 'valid' or 'invalid' with reasons.",
        output_key="review_status"
    )
    
    # Optional: Further steps based on review_status
    
    review_pipeline = SequentialAgent(
        name="WriteAndReview",
        sub_agents=[generator, reviewer]
    )
    # generator runs -> saves draft to state['draft_text']
    # reviewer runs -> reads state['draft_text'], saves status to state['review_status']
    ```

=== "Java"

    ```java
    // Conceptual Code: Generator-Critic
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.agents.SequentialAgent;
    
    LlmAgent generator = LlmAgent.builder()
        .name("DraftWriter")
        .instruction("Write a short paragraph about subject X.")
        .outputKey("draft_text")
        .build();
    
    LlmAgent reviewer = LlmAgent.builder()
        .name("FactChecker")
        .instruction("Review the text in {draft_text} for factual accuracy. Output 'valid' or 'invalid' with reasons.")
        .outputKey("review_status")
        .build();
    
    // Optional: Further steps based on review_status
    
    SequentialAgent reviewPipeline = SequentialAgent.builder()
        .name("WriteAndReview")
        .subAgents(generator, reviewer)
        .build();
    
    // generator runs -> saves draft to state['draft_text']
    // reviewer runs -> reads state['draft_text'], saves status to state['review_status']
    ```

### Iterative Refinement Pattern

* **Structure:** Uses a [`LoopAgent`](workflow-agents/loop-agents.md) containing one or more agents that work on a task over multiple iterations.
* **Goal:** Progressively improve a result (e.g., code, text, plan) stored in the session state until a quality threshold is met or a maximum number of iterations is reached.
* **ADK Primitives Used:**
    * **Workflow:** `LoopAgent` manages the repetition.
    * **Communication:** **Shared Session State** is essential for agents to read the previous iteration's output and save the refined version.
    * **Termination:** The loop typically ends based on `max_iterations` or a dedicated checking agent setting `escalate=True` in the `Event Actions` when the result is satisfactory.

=== "Python"

    ```python
    # Conceptual Code: Iterative Code Refinement
    from google.adk.agents import LoopAgent, LlmAgent, BaseAgent
    from google.adk.events import Event, EventActions
    from google.adk.agents.invocation_context import InvocationContext
    from typing import AsyncGenerator
    
    # Agent to generate/refine code based on state['current_code'] and state['requirements']
    code_refiner = LlmAgent(
        name="CodeRefiner",
        instruction="Read state['current_code'] (if exists) and state['requirements']. Generate/refine Python code to meet requirements. Save to state['current_code'].",
        output_key="current_code" # Overwrites previous code in state
    )
    
    # Agent to check if the code meets quality standards
    quality_checker = LlmAgent(
        name="QualityChecker",
        instruction="Evaluate the code in state['current_code'] against state['requirements']. Output 'pass' or 'fail'.",
        output_key="quality_status"
    )
    
    # Custom agent to check the status and escalate if 'pass'
    class CheckStatusAndEscalate(BaseAgent):
        async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:
            status = ctx.session.state.get("quality_status", "fail")
            should_stop = (status == "pass")
            yield Event(author=self.name, actions=EventActions(escalate=should_stop))
    
    refinement_loop = LoopAgent(
        name="CodeRefinementLoop",
        max_iterations=5,
        sub_agents=[code_refiner, quality_checker, CheckStatusAndEscalate(name="StopChecker")]
    )
    # Loop runs: Refiner -> Checker -> StopChecker
    # State['current_code'] is updated each iteration.
    # Loop stops if QualityChecker outputs 'pass' (leading to StopChecker escalating) or after 5 iterations.
    ```

=== "Java"

    ```java
    // Conceptual Code: Iterative Code Refinement
    import com.google.adk.agents.BaseAgent;
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.agents.LoopAgent;
    import com.google.adk.events.Event;
    import com.google.adk.events.EventActions;
    import com.google.adk.agents.InvocationContext;
    import io.reactivex.rxjava3.core.Flowable;
    import java.util.List;
    
    // Agent to generate/refine code based on state['current_code'] and state['requirements']
    LlmAgent codeRefiner = LlmAgent.builder()
        .name("CodeRefiner")
        .instruction("Read state['current_code'] (if exists) and state['requirements']. Generate/refine Java code to meet requirements. Save to state['current_code'].")
        .outputKey("current_code") // Overwrites previous code in state
        .build();
    
    // Agent to check if the code meets quality standards
    LlmAgent qualityChecker = LlmAgent.builder()
        .name("QualityChecker")
        .instruction("Evaluate the code in state['current_code'] against state['requirements']. Output 'pass' or 'fail'.")
        .outputKey("quality_status")
        .build();
    
    BaseAgent checkStatusAndEscalate = new BaseAgent(
        "StopChecker","Checks quality_status and escalates if 'pass'.", List.of(), null, null) {
    
      @Override
      protected Flowable<Event> runAsyncImpl(InvocationContext invocationContext) {
        String status = (String) invocationContext.session().state().getOrDefault("quality_status", "fail");
        boolean shouldStop = "pass".equals(status);
    
        EventActions actions = EventActions.builder().escalate(shouldStop).build();
        Event event = Event.builder()
            .author(this.name())
            .actions(actions)
            .build();
        return Flowable.just(event);
      }
    };
    
    LoopAgent refinementLoop = LoopAgent.builder()
        .name("CodeRefinementLoop")
        .maxIterations(5)
        .subAgents(codeRefiner, qualityChecker, checkStatusAndEscalate)
        .build();
    
    // Loop runs: Refiner -> Checker -> StopChecker
    // State['current_code'] is updated each iteration.
    // Loop stops if QualityChecker outputs 'pass' (leading to StopChecker escalating) or after 5
    // iterations.
    ```

### Human-in-the-Loop Pattern

* **Structure:** Integrates human intervention points within an agent workflow.
* **Goal:** Allow for human oversight, approval, correction, or tasks that AI cannot perform.
* **ADK Primitives Used (Conceptual):**
    * **Interaction:** Can be implemented using a custom **Tool** that pauses execution and sends a request to an external system (e.g., a UI, ticketing system) waiting for human input. The tool then returns the human's response to the agent.
    * **Workflow:** Could use **LLM-Driven Delegation** (`transfer_to_agent`) targeting a conceptual "Human Agent" that triggers the external workflow, or use the custom tool within an `LlmAgent`.
    * **State/Callbacks:** State can hold task details for the human; callbacks can manage the interaction flow.
    * **Note:** ADK doesn't have a built-in "Human Agent" type, so this requires custom integration.

=== "Python"

    ```python
    # Conceptual Code: Using a Tool for Human Approval
    from google.adk.agents import LlmAgent, SequentialAgent
    from google.adk.tools import FunctionTool
    
    # --- Assume external_approval_tool exists ---
    # This tool would:
    # 1. Take details (e.g., request_id, amount, reason).
    # 2. Send these details to a human review system (e.g., via API).
    # 3. Poll or wait for the human response (approved/rejected).
    # 4. Return the human's decision.
    # async def external_approval_tool(amount: float, reason: str) -> str: ...
    approval_tool = FunctionTool(func=external_approval_tool)
    
    # Agent that prepares the request
    prepare_request = LlmAgent(
        name="PrepareApproval",
        instruction="Prepare the approval request details based on user input. Store amount and reason in state.",
        # ... likely sets state['approval_amount'] and state['approval_reason'] ...
    )
    
    # Agent that calls the human approval tool
    request_approval = LlmAgent(
        name="RequestHumanApproval",
        instruction="Use the external_approval_tool with amount from state['approval_amount'] and reason from state['approval_reason'].",
        tools=[approval_tool],
        output_key="human_decision"
    )
    
    # Agent that proceeds based on human decision
    process_decision = LlmAgent(
        name="ProcessDecision",
        instruction="Check {human_decision}. If 'approved', proceed. If 'rejected', inform user."
    )
    
    approval_workflow = SequentialAgent(
        name="HumanApprovalWorkflow",
        sub_agents=[prepare_request, request_approval, process_decision]
    )
    ```

=== "Java"

    ```java
    // Conceptual Code: Using a Tool for Human Approval
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.agents.SequentialAgent;
    import com.google.adk.tools.FunctionTool;
    
    // --- Assume external_approval_tool exists ---
    // This tool would:
    // 1. Take details (e.g., request_id, amount, reason).
    // 2. Send these details to a human review system (e.g., via API).
    // 3. Poll or wait for the human response (approved/rejected).
    // 4. Return the human's decision.
    // public boolean externalApprovalTool(float amount, String reason) { ... }
    FunctionTool approvalTool = FunctionTool.create(externalApprovalTool);
    
    // Agent that prepares the request
    LlmAgent prepareRequest = LlmAgent.builder()
        .name("PrepareApproval")
        .instruction("Prepare the approval request details based on user input. Store amount and reason in state.")
        // ... likely sets state['approval_amount'] and state['approval_reason'] ...
        .build();
    
    // Agent that calls the human approval tool
    LlmAgent requestApproval = LlmAgent.builder()
        .name("RequestHumanApproval")
        .instruction("Use the external_approval_tool with amount from state['approval_amount'] and reason from state['approval_reason'].")
        .tools(approvalTool)
        .outputKey("human_decision")
        .build();
    
    // Agent that proceeds based on human decision
    LlmAgent processDecision = LlmAgent.builder()
        .name("ProcessDecision")
        .instruction("Check {human_decision}. If 'approved', proceed. If 'rejected', inform user.")
        .build();
    
    SequentialAgent approvalWorkflow = SequentialAgent.builder()
        .name("HumanApprovalWorkflow")
        .subAgents(prepareRequest, requestApproval, processDecision)
        .build();
    ```

These patterns provide starting points for structuring your multi-agent systems. You can mix and match them as needed to create the most effective architecture for your specific application.



================================================
FILE: docs/agents/workflow-agents/index.md
================================================
# Workflow Agents

This section introduces "*workflow agents*" - **specialized agents that control the execution flow of its sub-agents**.  

Workflow agents are specialized components in ADK designed purely for **orchestrating the execution flow of sub-agents**. Their primary role is to manage *how* and *when* other agents run, defining the control flow of a process.

Unlike [LLM Agents](../llm-agents.md), which use Large Language Models for dynamic reasoning and decision-making, Workflow Agents operate based on **predefined logic**. They determine the execution sequence according to their type (e.g., sequential, parallel, loop) without consulting an LLM for the orchestration itself. This results in **deterministic and predictable execution patterns**.

ADK provides three core workflow agent types, each implementing a distinct execution pattern:

<div class="grid cards" markdown>

- :material-console-line: **Sequential Agents**

    ---

    Executes sub-agents one after another, in **sequence**.

    [:octicons-arrow-right-24: Learn more](sequential-agents.md)

- :material-console-line: **Loop Agents**

    ---

    **Repeatedly** executes its sub-agents until a specific termination condition is met.

    [:octicons-arrow-right-24: Learn more](loop-agents.md)

- :material-console-line: **Parallel Agents**

    ---

    Executes multiple sub-agents in **parallel**.

    [:octicons-arrow-right-24: Learn more](parallel-agents.md)

</div>

## Why Use Workflow Agents?

Workflow agents are essential when you need explicit control over how a series of tasks or agents are executed. They provide:

* **Predictability:** The flow of execution is guaranteed based on the agent type and configuration.
* **Reliability:** Ensures tasks run in the required order or pattern consistently.
* **Structure:** Allows you to build complex processes by composing agents within clear control structures.

While the workflow agent manages the control flow deterministically, the sub-agents it orchestrates can themselves be any type of agent, including intelligent LLM Agent instances. This allows you to combine structured process control with flexible, LLM-powered task execution.



================================================
FILE: docs/agents/workflow-agents/loop-agents.md
================================================
# Loop agents

## The `LoopAgent`

The `LoopAgent` is a workflow agent that executes its sub-agents in a loop (i.e. iteratively). It **_repeatedly runs_ a sequence of agents** for a specified number of iterations or until a termination condition is met.

Use the `LoopAgent` when your workflow involves repetition or iterative refinement, such as like revising code.

### Example

* You want to build an agent that can generate images of food, but sometimes when you want to generate a specific number of items (e.g. 5 bananas), it generates a different number of those items in the image (e.g. an image of 7 bananas). You have two tools: `Generate Image`, `Count Food Items`. Because you want to keep generating images until it either correctly generates the specified number of items, or after a certain number of iterations, you should build your agent using a `LoopAgent`.

As with other [workflow agents](index.md), the `LoopAgent` is not powered by an LLM, and is thus deterministic in how it executes. That being said, workflow agents are only concerned only with their execution (i.e. in a loop), and not their internal logic; the tools or sub-agents of a workflow agent may or may not utilize LLMs.

### How it Works

When the `LoopAgent`'s `Run Async` method is called, it performs the following actions:

1. **Sub-Agent Execution:**  It iterates through the Sub Agents list _in order_. For _each_ sub-agent, it calls the agent's `Run Async` method.
2. **Termination Check:**

    _Crucially_, the `LoopAgent` itself does _not_ inherently decide when to stop looping. You _must_ implement a termination mechanism to prevent infinite loops.  Common strategies include:

    * **Max Iterations**: Set a maximum number of iterations in the `LoopAgent`. **The loop will terminate after that many iterations**.
    * **Escalation from sub-agent**: Design one or more sub-agents to evaluate a condition (e.g., "Is the document quality good enough?", "Has a consensus been reached?").  If the condition is met, the sub-agent can signal termination (e.g., by raising a custom event, setting a flag in a shared context, or returning a specific value).

![Loop Agent](../../assets/loop-agent.png)

### Full Example: Iterative Document Improvement

Imagine a scenario where you want to iteratively improve a document:

* **Writer Agent:** An `LlmAgent` that generates or refines a draft on a topic.
* **Critic Agent:** An `LlmAgent` that critiques the draft, identifying areas for improvement.

    ```py
    LoopAgent(sub_agents=[WriterAgent, CriticAgent], max_iterations=5)
    ```

In this setup, the `LoopAgent` would manage the iterative process.  The `CriticAgent` could be **designed to return a "STOP" signal when the document reaches a satisfactory quality level**, preventing further iterations. Alternatively, the `max iterations` parameter could be used to limit the process to a fixed number of cycles, or external logic could be implemented to make stop decisions. The **loop would run at most five times**, ensuring the iterative refinement doesn't continue indefinitely.

???+ "Full Code"

    === "Python"
        ```py
        --8<-- "examples/python/snippets/agents/workflow-agents/loop_agent_doc_improv_agent.py:init"
        ```
    === "Java"
        ```java
        --8<-- "examples/java/snippets/src/main/java/agents/workflow/LoopAgentExample.java:init"
        ```




================================================
FILE: docs/agents/workflow-agents/parallel-agents.md
================================================
# Parallel agents

The `ParallelAgent` is a [workflow agent](index.md) that executes its sub-agents *concurrently*. This dramatically speeds up workflows where tasks can be performed independently.

Use `ParallelAgent` when: For scenarios prioritizing speed and involving independent, resource-intensive tasks, a `ParallelAgent` facilitates efficient parallel execution. **When sub-agents operate without dependencies, their tasks can be performed concurrently**, significantly reducing overall processing time.

As with other [workflow agents](index.md), the `ParallelAgent` is not powered by an LLM, and is thus deterministic in how it executes. That being said, workflow agents are only concerned with their execution (i.e. executing sub-agents in parallel), and not their internal logic; the tools or sub-agents of a workflow agent may or may not utilize LLMs.

### Example

This approach is particularly beneficial for operations like multi-source data retrieval or heavy computations, where parallelization yields substantial performance gains. Importantly, this strategy assumes no inherent need for shared state or direct information exchange between the concurrently executing agents.

### How it works

When the `ParallelAgent`'s `run_async()` method is called:

1. **Concurrent Execution:** It initiates the `run_async()` method of *each* sub-agent present in the `sub_agents` list *concurrently*.  This means all the agents start running at (approximately) the same time.
2. **Independent Branches:**  Each sub-agent operates in its own execution branch.  There is ***no* automatic sharing of conversation history or state between these branches** during execution.
3. **Result Collection:** The `ParallelAgent` manages the parallel execution and, typically, provides a way to access the results from each sub-agent after they have completed (e.g., through a list of results or events). The order of results may not be deterministic.

### Independent Execution and State Management

It's *crucial* to understand that sub-agents within a `ParallelAgent` run independently.  If you *need* communication or data sharing between these agents, you must implement it explicitly.  Possible approaches include:

* **Shared `InvocationContext`:** You could pass a shared `InvocationContext` object to each sub-agent.  This object could act as a shared data store.  However, you'd need to manage concurrent access to this shared context carefully (e.g., using locks) to avoid race conditions.
* **External State Management:**  Use an external database, message queue, or other mechanism to manage shared state and facilitate communication between agents.
* **Post-Processing:** Collect results from each branch, and then implement logic to coordinate data afterwards.

![Parallel Agent](../../assets/parallel-agent.png){: width="600"}

### Full Example: Parallel Web Research

Imagine researching multiple topics simultaneously:

1. **Researcher Agent 1:**  An `LlmAgent` that researches "renewable energy sources."
2. **Researcher Agent 2:**  An `LlmAgent` that researches "electric vehicle technology."
3. **Researcher Agent 3:**  An `LlmAgent` that researches "carbon capture methods."

    ```py
    ParallelAgent(sub_agents=[ResearcherAgent1, ResearcherAgent2, ResearcherAgent3])
    ```

These research tasks are independent.  Using a `ParallelAgent` allows them to run concurrently, potentially reducing the total research time significantly compared to running them sequentially. The results from each agent would be collected separately after they finish.

???+ "Full Code"

    === "Python"
        ```py
         --8<-- "examples/python/snippets/agents/workflow-agents/parallel_agent_web_research.py:init"
        ```
    === "Java"
        ```java
         --8<-- "examples/java/snippets/src/main/java/agents/workflow/ParallelResearchPipeline.java:full_code"
        ```



================================================
FILE: docs/agents/workflow-agents/sequential-agents.md
================================================
# Sequential agents

## The `SequentialAgent`

The `SequentialAgent` is a [workflow agent](index.md) that executes its sub-agents in the order they are specified in the list.

Use the `SequentialAgent` when you want the execution to occur in a fixed, strict order.

### Example

* You want to build an agent that can summarize any webpage, using two tools: `Get Page Contents` and `Summarize Page`. Because the agent must always call `Get Page Contents` before calling `Summarize Page` (you can't summarize from nothing!), you should build your agent using a `SequentialAgent`.

As with other [workflow agents](index.md), the `SequentialAgent` is not powered by an LLM, and is thus deterministic in how it executes. That being said, workflow agents are concerned only with their execution (i.e. in sequence), and not their internal logic; the tools or sub-agents of a workflow agent may or may not utilize LLMs.

### How it works

When the `SequentialAgent`'s `Run Async` method is called, it performs the following actions:

1. **Iteration:** It iterates through the sub agents list in the order they were provided.
2. **Sub-Agent Execution:** For each sub-agent in the list, it calls the sub-agent's `Run Async` method.

![Sequential Agent](../../assets/sequential-agent.png){: width="600"}

### Full Example: Code Development Pipeline

Consider a simplified code development pipeline:

* **Code Writer Agent:**  An LLM Agent that generates initial code based on a specification.
* **Code Reviewer Agent:**  An LLM Agent that reviews the generated code for errors, style issues, and adherence to best practices.  It receives the output of the Code Writer Agent.
* **Code Refactorer Agent:** An LLM Agent that takes the reviewed code (and the reviewer's comments) and refactors it to improve quality and address issues.

A `SequentialAgent` is perfect for this:

```py
SequentialAgent(sub_agents=[CodeWriterAgent, CodeReviewerAgent, CodeRefactorerAgent])
```

This ensures the code is written, *then* reviewed, and *finally* refactored, in a strict, dependable order. **The output from each sub-agent is passed to the next by storing them in state via [Output Key](../llm-agents.md#structuring-data-input_schema-output_schema-output_key)**.

???+ "Code"

    === "Python"
        ```py
        --8<-- "examples/python/snippets/agents/workflow-agents/sequential_agent_code_development_agent.py:init"
        ```

    === "Java"
        ```java
        --8<-- "examples/java/snippets/src/main/java/agents/workflow/SequentialAgentExample.java:init"
        ```

    


Directory structure:
└── tools/
    ├── authentication.md
    ├── built-in-tools.md
    ├── function-tools.md
    ├── google-cloud-tools.md
    ├── index.md
    ├── mcp-tools.md
    ├── openapi-tools.md
    └── third-party-tools.md

================================================
FILE: docs/tools/authentication.md
================================================
# Authenticating with Tools

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

## Core Concepts

Many tools need to access protected resources (like user data in Google Calendar, Salesforce records, etc.) and require authentication. ADK provides a system to handle various authentication methods securely.

The key components involved are:

1. **`AuthScheme`**: Defines *how* an API expects authentication credentials (e.g., as an API Key in a header, an OAuth 2.0 Bearer token). ADK supports the same types of authentication schemes as OpenAPI 3.0. To know more about what each type of credential is, refer to [OpenAPI doc: Authentication](https://swagger.io/docs/specification/v3_0/authentication/). ADK uses specific classes like `APIKey`, `HTTPBearer`, `OAuth2`, `OpenIdConnectWithConfig`.  
2. **`AuthCredential`**: Holds the *initial* information needed to *start* the authentication process (e.g., your application's OAuth Client ID/Secret, an API key value). It includes an `auth_type` (like `API_KEY`, `OAUTH2`, `SERVICE_ACCOUNT`) specifying the credential type.

The general flow involves providing these details when configuring a tool. ADK then attempts to automatically exchange the initial credential for a usable one (like an access token) before the tool makes an API call. For flows requiring user interaction (like OAuth consent), a specific interactive process involving the Agent Client application is triggered.

## Supported Initial Credential Types

* **API\_KEY:** For simple key/value authentication. Usually requires no exchange.  
* **HTTP:** Can represent Basic Auth (not recommended/supported for exchange) or already obtained Bearer tokens. If it's a Bearer token, no exchange is needed.  
* **OAUTH2:** For standard OAuth 2.0 flows. Requires configuration (client ID, secret, scopes) and often triggers the interactive flow for user consent.  
* **OPEN\_ID\_CONNECT:** For authentication based on OpenID Connect. Similar to OAuth2, often requires configuration and user interaction.  
* **SERVICE\_ACCOUNT:** For Google Cloud Service Account credentials (JSON key or Application Default Credentials). Typically exchanged for a Bearer token.

## Configuring Authentication on Tools

You set up authentication when defining your tool:

* **RestApiTool / OpenAPIToolset**: Pass `auth_scheme` and `auth_credential` during initialization

* **GoogleApiToolSet Tools**: ADK has built-in 1st party tools like Google Calendar, BigQuery etc,. Use the toolset's specific method.

* **APIHubToolset / ApplicationIntegrationToolset**: Pass `auth_scheme` and `auth_credential`during initialization, if the API managed in API Hub / provided by Application Integration requires authentication.

!!! tip "WARNING" 
    Storing sensitive credentials like access tokens and especially refresh tokens directly in the session state might pose security risks depending on your session storage backend (`SessionService`) and overall application security posture.

    *   **`InMemorySessionService`:** Suitable for testing and development, but data is lost when the process ends. Less risk as it's transient.
    *   **Database/Persistent Storage:** **Strongly consider encrypting** the token data before storing it in the database using a robust encryption library (like `cryptography`) and managing encryption keys securely (e.g., using a key management service).
    *   **Secure Secret Stores:** For production environments, storing sensitive credentials in a dedicated secret manager (like Google Cloud Secret Manager or HashiCorp Vault) is the **most recommended approach**. Your tool could potentially store only short-lived access tokens or secure references (not the refresh token itself) in the session state, fetching the necessary secrets from the secure store when needed.

---

## Journey 1: Building Agentic Applications with Authenticated Tools

This section focuses on using pre-existing tools (like those from `RestApiTool/ OpenAPIToolset`, `APIHubToolset`, `GoogleApiToolSet`) that require authentication within your agentic application. Your main responsibility is configuring the tools and handling the client-side part of interactive authentication flows (if required by the tool).

### 1. Configuring Tools with Authentication

When adding an authenticated tool to your agent, you need to provide its required `AuthScheme` and your application's initial `AuthCredential`.

**A. Using OpenAPI-based Toolsets (`OpenAPIToolset`, `APIHubToolset`, etc.)**

Pass the scheme and credential during toolset initialization. The toolset applies them to all generated tools. Here are few ways to create tools with authentication in ADK.

=== "API Key"

      Create a tool requiring an API Key.

      ```py
      from google.adk.tools.openapi_tool.auth.auth_helpers import token_to_scheme_credential
      from google.adk.tools.apihub_tool.apihub_toolset import APIHubToolset
      auth_scheme, auth_credential = token_to_scheme_credential(
         "apikey", "query", "apikey", YOUR_API_KEY_STRING
      )
      sample_api_toolset = APIHubToolset(
         name="sample-api-requiring-api-key",
         description="A tool using an API protected by API Key",
         apihub_resource_name="...",
         auth_scheme=auth_scheme,
         auth_credential=auth_credential,
      )
      ```

=== "OAuth2"

      Create a tool requiring OAuth2.

      ```py
      from google.adk.tools.openapi_tool.openapi_spec_parser.openapi_toolset import OpenAPIToolset
      from fastapi.openapi.models import OAuth2
      from fastapi.openapi.models import OAuthFlowAuthorizationCode
      from fastapi.openapi.models import OAuthFlows
      from google.adk.auth import AuthCredential
      from google.adk.auth import AuthCredentialTypes
      from google.adk.auth import OAuth2Auth

      auth_scheme = OAuth2(
          flows=OAuthFlows(
              authorizationCode=OAuthFlowAuthorizationCode(
                  authorizationUrl="https://accounts.google.com/o/oauth2/auth",
                  tokenUrl="https://oauth2.googleapis.com/token",
                  scopes={
                      "https://www.googleapis.com/auth/calendar": "calendar scope"
                  },
              )
          )
      )
      auth_credential = AuthCredential(
          auth_type=AuthCredentialTypes.OAUTH2,
          oauth2=OAuth2Auth(
              client_id=YOUR_OAUTH_CLIENT_ID, 
              client_secret=YOUR_OAUTH_CLIENT_SECRET
          ),
      )

      calendar_api_toolset = OpenAPIToolset(
          spec_str=google_calendar_openapi_spec_str, # Fill this with an openapi spec
          spec_str_type='yaml',
          auth_scheme=auth_scheme,
          auth_credential=auth_credential,
      )
      ```

=== "Service Account"

      Create a tool requiring Service Account.

      ```py
      from google.adk.tools.openapi_tool.auth.auth_helpers import service_account_dict_to_scheme_credential
      from google.adk.tools.openapi_tool.openapi_spec_parser.openapi_toolset import OpenAPIToolset

      service_account_cred = json.loads(service_account_json_str)
      auth_scheme, auth_credential = service_account_dict_to_scheme_credential(
          config=service_account_cred,
          scopes=["https://www.googleapis.com/auth/cloud-platform"],
      )
      sample_toolset = OpenAPIToolset(
          spec_str=sa_openapi_spec_str, # Fill this with an openapi spec
          spec_str_type='json',
          auth_scheme=auth_scheme,
          auth_credential=auth_credential,
      )
      ```

=== "OpenID connect"

      Create a tool requiring OpenID connect.

      ```py
      from google.adk.auth.auth_schemes import OpenIdConnectWithConfig
      from google.adk.auth.auth_credential import AuthCredential, AuthCredentialTypes, OAuth2Auth
      from google.adk.tools.openapi_tool.openapi_spec_parser.openapi_toolset import OpenAPIToolset

      auth_scheme = OpenIdConnectWithConfig(
          authorization_endpoint=OAUTH2_AUTH_ENDPOINT_URL,
          token_endpoint=OAUTH2_TOKEN_ENDPOINT_URL,
          scopes=['openid', 'YOUR_OAUTH_SCOPES"]
      )
      auth_credential = AuthCredential(
          auth_type=AuthCredentialTypes.OPEN_ID_CONNECT,
          oauth2=OAuth2Auth(
              client_id="...",
              client_secret="...",
          )
      )

      userinfo_toolset = OpenAPIToolset(
          spec_str=content, # Fill in an actual spec
          spec_str_type='yaml',
          auth_scheme=auth_scheme,
          auth_credential=auth_credential,
      )
      ```

**B. Using Google API Toolsets (e.g., `calendar_tool_set`)**

These toolsets often have dedicated configuration methods.

Tip: For how to create a Google OAuth Client ID & Secret, see this guide: [Get your Google API Client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id)

```py
# Example: Configuring Google Calendar Tools
from google.adk.tools.google_api_tool import calendar_tool_set

client_id = "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com"
client_secret = "YOUR_GOOGLE_OAUTH_CLIENT_SECRET"

# Use the specific configure method for this toolset type
calendar_tool_set.configure_auth(
    client_id=oauth_client_id, client_secret=oauth_client_secret
)

# agent = LlmAgent(..., tools=calendar_tool_set.get_tool('calendar_tool_set'))
```

The sequence diagram of auth request flow (where tools are requesting auth credentials) looks like below:

![Authentication](../assets/auth_part1.svg) 


### 2. Handling the Interactive OAuth/OIDC Flow (Client-Side)

If a tool requires user login/consent (typically OAuth 2.0 or OIDC), the ADK framework pauses execution and signals your **Agent Client** application. There are two cases:

* **Agent Client** application runs the agent directly (via `runner.run_async`) in the same process. e.g. UI backend, CLI app, or Spark job etc.
* **Agent Client** application interacts with ADK's fastapi server via `/run` or `/run_sse` endpoint. While ADK's fastapi server could be setup on the same server or different server as **Agent Client** application

The second case is a special case of first case, because `/run` or `/run_sse` endpoint also invokes `runner.run_async`. The only differences are:

* Whether to call a python function to run the agent (first case) or call a service endpoint to run the agent (second case).
* Whether the result events are in-memory objects (first case) or serialized json string in http response (second case).

Below sections focus on the first case and you should be able to map it to the second case very straightforward. We will also describe some differences to handle for the second case if necessary.

Here's the step-by-step process for your client application:

**Step 1: Run Agent & Detect Auth Request**

* Initiate the agent interaction using `runner.run_async`.  
* Iterate through the yielded events.  
* Look for a specific function call event whose function call has a special name: `adk_request_credential`. This event signals that user interaction is needed. You can use helper functions to identify this event and extract necessary information. (For the second case, the logic is similar. You deserialize the event from the http response).

```py

# runner = Runner(...)
# session = await session_service.create_session(...)
# content = types.Content(...) # User's initial query

print("\nRunning agent...")
events_async = runner.run_async(
    session_id=session.id, user_id='user', new_message=content
)

auth_request_function_call_id, auth_config = None, None

async for event in events_async:
    # Use helper to check for the specific auth request event
    if (auth_request_function_call := get_auth_request_function_call(event)):
        print("--> Authentication required by agent.")
        # Store the ID needed to respond later
        if not (auth_request_function_call_id := auth_request_function_call.id):
            raise ValueError(f'Cannot get function call id from function call: {auth_request_function_call}')
        # Get the AuthConfig containing the auth_uri etc.
        auth_config = get_auth_config(auth_request_function_call)
        break # Stop processing events for now, need user interaction

if not auth_request_function_call_id:
    print("\nAuth not required or agent finished.")
    # return # Or handle final response if received

```

*Helper functions `helpers.py`:*

```py
from google.adk.events import Event
from google.adk.auth import AuthConfig # Import necessary type
from google.genai import types

def get_auth_request_function_call(event: Event) -> types.FunctionCall:
    # Get the special auth request function call from the event
    if not event.content or event.content.parts:
        return
    for part in event.content.parts:
        if (
            part 
            and part.function_call 
            and part.function_call.name == 'adk_request_credential'
            and event.long_running_tool_ids 
            and part.function_call.id in event.long_running_tool_ids
        ):

            return part.function_call

def get_auth_config(auth_request_function_call: types.FunctionCall) -> AuthConfig:
    # Extracts the AuthConfig object from the arguments of the auth request function call
    if not auth_request_function_call.args or not (auth_config := auth_request_function_call.args.get('auth_config')):
        raise ValueError(f'Cannot get auth config from function call: {auth_request_function_call}')
    if not isinstance(auth_config, AuthConfig):
        raise ValueError(f'Cannot get auth config {auth_config} is not an instance of AuthConfig.')
    return auth_config
```

**Step 2: Redirect User for Authorization**

* Get the authorization URL (`auth_uri`) from the `auth_config` extracted in the previous step.  
* **Crucially, append your application's**  redirect\_uri as a query parameter to this `auth_uri`. This `redirect_uri` must be pre-registered with your OAuth provider (e.g., [Google Cloud Console](https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred), [Okta admin panel](https://developer.okta.com/docs/guides/sign-into-web-app-redirect/spring-boot/main/#create-an-app-integration-in-the-admin-console)).  
* Direct the user to this complete URL (e.g., open it in their browser).

```py
# (Continuing after detecting auth needed)

if auth_request_function_call_id and auth_config:
    # Get the base authorization URL from the AuthConfig
    base_auth_uri = auth_config.exchanged_auth_credential.oauth2.auth_uri

    if base_auth_uri:
        redirect_uri = 'http://localhost:8000/callback' # MUST match your OAuth client app config
        # Append redirect_uri (use urlencode in production)
        auth_request_uri = base_auth_uri + f'&redirect_uri={redirect_uri}'
        # Now you need to redirect your end user to this auth_request_uri or ask them to open this auth_request_uri in their browser
        # This auth_request_uri should be served by the corresponding auth provider and the end user should login and authorize your applicaiton to access their data
        # And then the auth provider will redirect the end user to the redirect_uri you provided
        # Next step: Get this callback URL from the user (or your web server handler)
    else:
         print("ERROR: Auth URI not found in auth_config.")
         # Handle error

```

**Step 3. Handle the Redirect Callback (Client):**

* Your application must have a mechanism (e.g., a web server route at the `redirect_uri`) to receive the user after they authorize the application with the provider.  
* The provider redirects the user to your `redirect_uri` and appends an `authorization_code` (and potentially `state`, `scope`) as query parameters to the URL.  
* Capture the **full callback URL** from this incoming request.  
* (This step happens outside the main agent execution loop, in your web server or equivalent callback handler.)

**Step 4. Send Authentication Result Back to ADK (Client):**

* Once you have the full callback URL (containing the authorization code), retrieve the `auth_request_function_call_id` and the `auth_config` object saved in Client Step 1\.  
* Set the captured callback URL into the `exchanged_auth_credential.oauth2.auth_response_uri` field. Also ensure `exchanged_auth_credential.oauth2.redirect_uri` contains the redirect URI you used.  
* Create a `types.Content` object containing a `types.Part` with a `types.FunctionResponse`.  
      * Set `name` to `"adk_request_credential"`. (Note: This is a special name for ADK to proceed with authentication. Do not use other names.)  
      * Set `id` to the `auth_request_function_call_id` you saved.  
      * Set `response` to the *serialized* (e.g., `.model_dump()`) updated `AuthConfig` object.  
* Call `runner.run_async` **again** for the same session, passing this `FunctionResponse` content as the `new_message`.

```py
# (Continuing after user interaction)

    # Simulate getting the callback URL (e.g., from user paste or web handler)
    auth_response_uri = await get_user_input(
        f'Paste the full callback URL here:\n> '
    )
    auth_response_uri = auth_response_uri.strip() # Clean input

    if not auth_response_uri:
        print("Callback URL not provided. Aborting.")
        return

    # Update the received AuthConfig with the callback details
    auth_config.exchanged_auth_credential.oauth2.auth_response_uri = auth_response_uri
    # Also include the redirect_uri used, as the token exchange might need it
    auth_config.exchanged_auth_credential.oauth2.redirect_uri = redirect_uri

    # Construct the FunctionResponse Content object
    auth_content = types.Content(
        role='user', # Role can be 'user' when sending a FunctionResponse
        parts=[
            types.Part(
                function_response=types.FunctionResponse(
                    id=auth_request_function_call_id,       # Link to the original request
                    name='adk_request_credential', # Special framework function name
                    response=auth_config.model_dump() # Send back the *updated* AuthConfig
                )
            )
        ],
    )

    # --- Resume Execution ---
    print("\nSubmitting authentication details back to the agent...")
    events_async_after_auth = runner.run_async(
        session_id=session.id,
        user_id='user',
        new_message=auth_content, # Send the FunctionResponse back
    )

    # --- Process Final Agent Output ---
    print("\n--- Agent Response after Authentication ---")
    async for event in events_async_after_auth:
        # Process events normally, expecting the tool call to succeed now
        print(event) # Print the full event for inspection

```

**Step 5: ADK Handles Token Exchange & Tool Retry and gets Tool result**

* ADK receives the `FunctionResponse` for `adk_request_credential`.  
* It uses the information in the updated `AuthConfig` (including the callback URL containing the code) to perform the OAuth **token exchange** with the provider's token endpoint, obtaining the access token (and possibly refresh token).  
* ADK internally makes these tokens available by setting them in the session state).  
* ADK **automatically retries** the original tool call (the one that initially failed due to missing auth).  
* This time, the tool finds the valid tokens (via `tool_context.get_auth_response()`) and successfully executes the authenticated API call.  
* The agent receives the actual result from the tool and generates its final response to the user.

---

The sequence diagram of auth response flow (where Agent Client send back the auth response and ADK retries tool calling) looks like below:

![Authentication](../assets/auth_part2.svg)

## Journey 2: Building Custom Tools (`FunctionTool`) Requiring Authentication

This section focuses on implementing the authentication logic *inside* your custom Python function when creating a new ADK Tool. We will implement a `FunctionTool` as an example.

### Prerequisites

Your function signature *must* include [`tool_context: ToolContext`](../tools/index.md#tool-context). ADK automatically injects this object, providing access to state and auth mechanisms.

```py
from google.adk.tools import FunctionTool, ToolContext
from typing import Dict

def my_authenticated_tool_function(param1: str, ..., tool_context: ToolContext) -> dict:
    # ... your logic ...
    pass

my_tool = FunctionTool(func=my_authenticated_tool_function)

```

### Authentication Logic within the Tool Function

Implement the following steps inside your function:

**Step 1: Check for Cached & Valid Credentials:**

Inside your tool function, first check if valid credentials (e.g., access/refresh tokens) are already stored from a previous run in this session. Credentials for the current sessions should be stored in `tool_context.invocation_context.session.state` (a dictionary of state) Check existence of existing credentials by checking `tool_context.invocation_context.session.state.get(credential_name, None)`.

```py
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

# Inside your tool function
TOKEN_CACHE_KEY = "my_tool_tokens" # Choose a unique key
SCOPES = ["scope1", "scope2"] # Define required scopes

creds = None
cached_token_info = tool_context.state.get(TOKEN_CACHE_KEY)
if cached_token_info:
    try:
        creds = Credentials.from_authorized_user_info(cached_token_info, SCOPES)
        if not creds.valid and creds.expired and creds.refresh_token:
            creds.refresh(Request())
            tool_context.state[TOKEN_CACHE_KEY] = json.loads(creds.to_json()) # Update cache
        elif not creds.valid:
            creds = None # Invalid, needs re-auth
            tool_context.state[TOKEN_CACHE_KEY] = None
    except Exception as e:
        print(f"Error loading/refreshing cached creds: {e}")
        creds = None
        tool_context.state[TOKEN_CACHE_KEY] = None

if creds and creds.valid:
    # Skip to Step 5: Make Authenticated API Call
    pass
else:
    # Proceed to Step 2...
    pass

```

**Step 2: Check for Auth Response from Client**

* If Step 1 didn't yield valid credentials, check if the client just completed the interactive flow by calling `exchanged_credential = tool_context.get_auth_response()`.  
* This returns the updated `exchanged_credential` object sent back by the client (containing the callback URL in `auth_response_uri`).

```py
# Use auth_scheme and auth_credential configured in the tool.
# exchanged_credential: AuthCredential | None

exchanged_credential = tool_context.get_auth_response(AuthConfig(
  auth_scheme=auth_scheme,
  raw_auth_credential=auth_credential,
))
# If exchanged_credential is not None, then there is already an exchanged credetial from the auth response. 
if exchanged_credential:
   # ADK exchanged the access token already for us
        access_token = exchanged_credential.oauth2.access_token
        refresh_token = exchanged_credential.oauth2.refresh_token
        creds = Credentials(
            token=access_token,
            refresh_token=refresh_token,
            token_uri=auth_scheme.flows.authorizationCode.tokenUrl,
            client_id=auth_credential.oauth2.client_id,
            client_secret=auth_credential.oauth2.client_secret,
            scopes=list(auth_scheme.flows.authorizationCode.scopes.keys()),
        )
    # Cache the token in session state and call the API, skip to step 5
```

**Step 3: Initiate Authentication Request**

If no valid credentials (Step 1.) and no auth response (Step 2.) are found, the tool needs to start the OAuth flow. Define the AuthScheme and initial AuthCredential and call `tool_context.request_credential()`. Return a response indicating authorization is needed.

```py
# Use auth_scheme and auth_credential configured in the tool.

  tool_context.request_credential(AuthConfig(
    auth_scheme=auth_scheme,
    raw_auth_credential=auth_credential,
  ))
  return {'pending': true, 'message': 'Awaiting user authentication.'}

# By setting request_credential, ADK detects a pending authentication event. It pauses execution and ask end user to login.
```

**Step 4: Exchange Authorization Code for Tokens**

ADK automatically generates oauth authorization URL and presents it to your Agent Client application. your Agent Client application should follow the same way described in Journey 1 to redirect the user to the authorization URL (with `redirect_uri` appended). Once a user completes the login flow following the authorization URL and ADK extracts the authentication callback url from Agent Client applications, automatically parses the auth code, and generates auth token. At the next Tool call, `tool_context.get_auth_response` in step 2 will contain a valid credential to use in subsequent API calls.

**Step 5: Cache Obtained Credentials**

After successfully obtaining the token from ADK (Step 2) or if the token is still valid (Step 1), **immediately store** the new `Credentials` object in `tool_context.state` (serialized, e.g., as JSON) using your cache key.

```py
# Inside your tool function, after obtaining 'creds' (either refreshed or newly exchanged)
# Cache the new/refreshed tokens
tool_context.state[TOKEN_CACHE_KEY] = json.loads(creds.to_json())
print(f"DEBUG: Cached/updated tokens under key: {TOKEN_CACHE_KEY}")
# Proceed to Step 6 (Make API Call)

```

**Step 6: Make Authenticated API Call**

* Once you have a valid `Credentials` object (`creds` from Step 1 or Step 4), use it to make the actual call to the protected API using the appropriate client library (e.g., `googleapiclient`, `requests`). Pass the `credentials=creds` argument.  
* Include error handling, especially for `HttpError` 401/403, which might mean the token expired or was revoked between calls. If you get such an error, consider clearing the cached token (`tool_context.state.pop(...)`) and potentially returning the `auth_required` status again to force re-authentication.

```py
# Inside your tool function, using the valid 'creds' object
# Ensure creds is valid before proceeding
if not creds or not creds.valid:
   return {"status": "error", "error_message": "Cannot proceed without valid credentials."}

try:
   service = build("calendar", "v3", credentials=creds) # Example
   api_result = service.events().list(...).execute()
   # Proceed to Step 7
except Exception as e:
   # Handle API errors (e.g., check for 401/403, maybe clear cache and re-request auth)
   print(f"ERROR: API call failed: {e}")
   return {"status": "error", "error_message": f"API call failed: {e}"}
```

**Step 7: Return Tool Result**

* After a successful API call, process the result into a dictionary format that is useful for the LLM.  
* **Crucially, include a**  along with the data.

```py
# Inside your tool function, after successful API call
    processed_result = [...] # Process api_result for the LLM
    return {"status": "success", "data": processed_result}

```

??? "Full Code"

    === "Tools and Agent"

         ```py title="tools_and_agent.py"
         --8<-- "examples/python/snippets/tools/auth/tools_and_agent.py"
         ```
    === "Agent CLI"

         ```py title="agent_cli.py"
         --8<-- "examples/python/snippets/tools/auth/agent_cli.py"
         ```
    === "Helper"

         ```py title="helpers.py"
         --8<-- "examples/python/snippets/tools/auth/helpers.py"
         ```
    === "Spec"

         ```yaml
         openapi: 3.0.1
         info:
         title: Okta User Info API
         version: 1.0.0
         description: |-
            API to retrieve user profile information based on a valid Okta OIDC Access Token.
            Authentication is handled via OpenID Connect with Okta.
         contact:
            name: API Support
            email: support@example.com # Replace with actual contact if available
         servers:
         - url: <substitute with your server name>
            description: Production Environment
         paths:
         /okta-jwt-user-api:
            get:
               summary: Get Authenticated User Info
               description: |-
               Fetches profile details for the user
               operationId: getUserInfo
               tags:
               - User Profile
               security:
               - okta_oidc:
                     - openid
                     - email
                     - profile
               responses:
               '200':
                  description: Successfully retrieved user information.
                  content:
                     application/json:
                     schema:
                        type: object
                        properties:
                           sub:
                           type: string
                           description: Subject identifier for the user.
                           example: "abcdefg"
                           name:
                           type: string
                           description: Full name of the user.
                           example: "Example LastName"
                           locale:
                           type: string
                           description: User's locale, e.g., en-US or en_US.
                           example: "en_US"
                           email:
                           type: string
                           format: email
                           description: User's primary email address.
                           example: "username@example.com"
                           preferred_username:
                           type: string
                           description: Preferred username of the user (often the email).
                           example: "username@example.com"
                           given_name:
                           type: string
                           description: Given name (first name) of the user.
                           example: "Example"
                           family_name:
                           type: string
                           description: Family name (last name) of the user.
                           example: "LastName"
                           zoneinfo:
                           type: string
                           description: User's timezone, e.g., America/Los_Angeles.
                           example: "America/Los_Angeles"
                           updated_at:
                           type: integer
                           format: int64 # Using int64 for Unix timestamp
                           description: Timestamp when the user's profile was last updated (Unix epoch time).
                           example: 1743617719
                           email_verified:
                           type: boolean
                           description: Indicates if the user's email address has been verified.
                           example: true
                        required:
                           - sub
                           - name
                           - locale
                           - email
                           - preferred_username
                           - given_name
                           - family_name
                           - zoneinfo
                           - updated_at
                           - email_verified
               '401':
                  description: Unauthorized. The provided Bearer token is missing, invalid, or expired.
                  content:
                     application/json:
                     schema:
                        $ref: '#/components/schemas/Error'
               '403':
                  description: Forbidden. The provided token does not have the required scopes or permissions to access this resource.
                  content:
                     application/json:
                     schema:
                        $ref: '#/components/schemas/Error'
         components:
         securitySchemes:
            okta_oidc:
               type: openIdConnect
               description: Authentication via Okta using OpenID Connect. Requires a Bearer Access Token.
               openIdConnectUrl: https://your-endpoint.okta.com/.well-known/openid-configuration
         schemas:
            Error:
               type: object
               properties:
               code:
                  type: string
                  description: An error code.
               message:
                  type: string
                  description: A human-readable error message.
               required:
                  - code
                  - message
         ```




================================================
FILE: docs/tools/built-in-tools.md
================================================
# Built-in tools

These built-in tools provide ready-to-use functionality such as Google Search or
code executors that provide agents with common capabilities. For instance, an
agent that needs to retrieve information from the web can directly use the
**google\_search** tool without any additional setup.

## How to Use

1. **Import:** Import the desired tool from the tools module. This is `agents.tools` in Python or `com.google.adk.tools` in Java.
2. **Configure:** Initialize the tool, providing required parameters if any.
3. **Register:** Add the initialized tool to the **tools** list of your Agent.

Once added to an agent, the agent can decide to use the tool based on the **user
prompt** and its **instructions**. The framework handles the execution of the
tool when the agent calls it. Important: check the ***Limitations*** section of this page.

## Available Built-in tools

Note: Java only supports Google Search and Code Execution tools currently.

### Google Search

The `google_search` tool allows the agent to perform web searches using Google Search. The `google_search` tool is only compatible with Gemini 2 models. For further details of the tool, see [Understanding Google Search grounding](../grounding/google_search_grounding.md).

!!! warning "Additional requirements when using the `google_search` tool"
    When you use grounding with Google Search, and you receive Search suggestions in your response, you must display the Search suggestions in production and in your applications.
    For more information on grounding with Google Search, see Grounding with Google Search documentation for [Google AI Studio](https://ai.google.dev/gemini-api/docs/grounding/search-suggestions) or [Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-search-suggestions). The UI code (HTML) is returned in the Gemini response as `renderedContent`, and you will need to show the HTML in your app, in accordance with the policy.

=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/built-in-tools/google_search.py"
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/tools/GoogleSearchAgentApp.java:full_code"
    ```

### Code Execution

The `built_in_code_execution` tool enables the agent to execute code,
specifically when using Gemini 2 models. This allows the model to perform tasks
like calculations, data manipulation, or running small scripts.

=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/built-in-tools/code_execution.py"
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/tools/CodeExecutionAgentApp.java:full_code"
    ```


### Vertex AI Search

The `vertex_ai_search_tool` uses Google Cloud's Vertex AI Search, enabling the
agent to search across your private, configured data stores (e.g., internal
documents, company policies, knowledge bases). This built-in tool requires you
to provide the specific data store ID during configuration. For further details of the tool, see [Understanding Vertex AI Search grounding](../grounding/vertex_ai_search_grounding.md).


```py
--8<-- "examples/python/snippets/tools/built-in-tools/vertexai_search.py"
```


### BigQuery

These are a set of tools aimed to provide integration with BigQuery, namely:

* **`list_dataset_ids`**: Fetches BigQuery dataset ids present in a GCP project.
* **`get_dataset_info`**: Fetches metadata about a BigQuery dataset.
* **`list_table_ids`**: Fetches table ids present in a BigQuery dataset.
* **`get_table_info`**: Fetches metadata about a BigQuery table.
* **`execute_sql`**: Runs a SQL query in BigQuery and fetch the result.

They are packaged in the toolset `BigQueryToolset`.



```py
--8<-- "examples/python/snippets/tools/built-in-tools/bigquery.py"
```

## Use Built-in tools with other tools

The following code sample demonstrates how to use multiple built-in tools or how
to use built-in tools with other tools by using multiple agents:

=== "Python"

    ```py
    from google.adk.tools import agent_tool
    from google.adk.agents import Agent
    from google.adk.tools import google_search
    from google.adk.code_executors import BuiltInCodeExecutor
    

    search_agent = Agent(
        model='gemini-2.0-flash',
        name='SearchAgent',
        instruction="""
        You're a specialist in Google Search
        """,
        tools=[google_search],
    )
    coding_agent = Agent(
        model='gemini-2.0-flash',
        name='CodeAgent',
        instruction="""
        You're a specialist in Code Execution
        """,
        tools=[BuiltInCodeExecutor],
    )
    root_agent = Agent(
        name="RootAgent",
        model="gemini-2.0-flash",
        description="Root Agent",
        tools=[agent_tool.AgentTool(agent=search_agent), agent_tool.AgentTool(agent=coding_agent)],
    )
    ```

=== "Java"

    ```java
    import com.google.adk.agents.BaseAgent;
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.tools.AgentTool;
    import com.google.adk.tools.BuiltInCodeExecutionTool;
    import com.google.adk.tools.GoogleSearchTool;
    import com.google.common.collect.ImmutableList;
    
    public class NestedAgentApp {
    
      private static final String MODEL_ID = "gemini-2.0-flash";
    
      public static void main(String[] args) {

        // Define the SearchAgent
        LlmAgent searchAgent =
            LlmAgent.builder()
                .model(MODEL_ID)
                .name("SearchAgent")
                .instruction("You're a specialist in Google Search")
                .tools(new GoogleSearchTool()) // Instantiate GoogleSearchTool
                .build();
    

        // Define the CodingAgent
        LlmAgent codingAgent =
            LlmAgent.builder()
                .model(MODEL_ID)
                .name("CodeAgent")
                .instruction("You're a specialist in Code Execution")
                .tools(new BuiltInCodeExecutionTool()) // Instantiate BuiltInCodeExecutionTool
                .build();

        // Define the RootAgent, which uses AgentTool.create() to wrap SearchAgent and CodingAgent
        BaseAgent rootAgent =
            LlmAgent.builder()
                .name("RootAgent")
                .model(MODEL_ID)
                .description("Root Agent")
                .tools(
                    AgentTool.create(searchAgent), // Use create method
                    AgentTool.create(codingAgent)   // Use create method
                 )
                .build();

        // Note: This sample only demonstrates the agent definitions.
        // To run these agents, you'd need to integrate them with a Runner and SessionService,
        // similar to the previous examples.
        System.out.println("Agents defined successfully:");
        System.out.println("  Root Agent: " + rootAgent.name());
        System.out.println("  Search Agent (nested): " + searchAgent.name());
        System.out.println("  Code Agent (nested): " + codingAgent.name());
      }
    }
    ```


### Limitations

!!! warning

    Currently, for each root agent or single agent, only one built-in tool is
    supported. No other tools of any type can be used in the same agent.

 For example, the following approach that uses ***a built-in tool along with
 other tools*** within a single agent is **not** currently supported:

=== "Python"

    ```py
    root_agent = Agent(
        name="RootAgent",
        model="gemini-2.0-flash",
        description="Root Agent",
        tools=[custom_function, BuiltInCodeExecutor], # <-- BuiltInCodeExecutor not supported when used with tools
    )
    ```

=== "Java"

    ```java
     LlmAgent searchAgent =
            LlmAgent.builder()
                .model(MODEL_ID)
                .name("SearchAgent")
                .instruction("You're a specialist in Google Search")
                .tools(new GoogleSearchTool(), new YourCustomTool()) // <-- not supported
                .build();
    ```

!!! warning

    Built-in tools cannot be used within a sub-agent.

For example, the following approach that uses built-in tools within sub-agents
is **not** currently supported:

=== "Python"

    ```py
    search_agent = Agent(
        model='gemini-2.0-flash',
        name='SearchAgent',
        instruction="""
        You're a specialist in Google Search
        """,
        tools=[google_search],
    )
    coding_agent = Agent(
        model='gemini-2.0-flash',
        name='CodeAgent',
        instruction="""
        You're a specialist in Code Execution
        """,
        tools=[BuiltInCodeExecutor],
    )
    root_agent = Agent(
        name="RootAgent",
        model="gemini-2.0-flash",
        description="Root Agent",
        sub_agents=[
            search_agent,
            coding_agent
        ],
    )
    ```

=== "Java"

    ```java
    LlmAgent searchAgent =
        LlmAgent.builder()
            .model("gemini-2.0-flash")
            .name("SearchAgent")
            .instruction("You're a specialist in Google Search")
            .tools(new GoogleSearchTool())
            .build();

    LlmAgent codingAgent =
        LlmAgent.builder()
            .model("gemini-2.0-flash")
            .name("CodeAgent")
            .instruction("You're a specialist in Code Execution")
            .tools(new BuiltInCodeExecutionTool())
            .build();
    

    LlmAgent rootAgent =
        LlmAgent.builder()
            .name("RootAgent")
            .model("gemini-2.0-flash")
            .description("Root Agent")
            .subAgents(searchAgent, codingAgent) // Not supported, as the sub agents use built in tools.
            .build();
    ```



================================================
FILE: docs/tools/function-tools.md
================================================
# Function tools

## What are function tools?

When out-of-the-box tools don't fully meet specific requirements, developers can create custom function tools. This allows for **tailored functionality**, such as connecting to proprietary databases or implementing unique algorithms.

*For example,* a function tool, "myfinancetool", might be a function that calculates a specific financial metric. ADK also supports long running functions, so if that calculation takes a while, the agent can continue working on other tasks.

ADK offers several ways to create functions tools, each suited to different levels of complexity and control:

1. Function Tool
2. Long Running Function Tool
3. Agents-as-a-Tool

## 1. Function Tool

Transforming a function into a tool is a straightforward way to integrate custom logic into your agents. In fact, when you assign a function to an agent’s tools list, the framework will automatically wrap it as a Function Tool for you. This approach offers flexibility and quick integration.

### Parameters

Define your function parameters using standard **JSON-serializable types** (e.g., string, integer, list, dictionary). It's important to avoid setting default values for parameters, as the language model (LLM) does not currently support interpreting them.

### Return Type

The preferred return type for a Function Tool is a **dictionary** in Python or **Map** in Java. This allows you to structure the response with key-value pairs, providing context and clarity to the LLM. If your function returns a type other than a dictionary, the framework automatically wraps it into a dictionary with a single key named **"result"**.

Strive to make your return values as descriptive as possible. *For example,* instead of returning a numeric error code, return a dictionary with an "error\_message" key containing a human-readable explanation. **Remember that the LLM**, not a piece of code, needs to understand the result. As a best practice, include a "status" key in your return dictionary to indicate the overall outcome (e.g., "success", "error", "pending"), providing the LLM with a clear signal about the operation's state.

### Docstring / Source code comments

The docstring (or comments above) your function serve as the tool's description and is sent to the LLM. Therefore, a well-written and comprehensive docstring is crucial for the LLM to understand how to use the tool effectively. Clearly explain the purpose of the function, the meaning of its parameters, and the expected return values.

??? "Example"

    === "Python"
    
        This tool is a python function which obtains the Stock price of a given Stock ticker/ symbol.
    
        <u>Note</u>: You need to `pip install yfinance` library before using this tool.
    
        ```py
        --8<-- "examples/python/snippets/tools/function-tools/func_tool.py"
        ```
    
        The return value from this tool will be wrapped into a dictionary.
    
        ```json
        {"result": "$123"}
        ```
    
    === "Java"
    
        This tool retrieves the mocked value of a stock price.
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/tools/StockPriceAgent.java:full_code"
        ```
    
        The return value from this tool will be wrapped into a Map<String, Object>.
    
        ```json
        For input `GOOG`: {"symbol": "GOOG", "price": "1.0"}
        ```

### Best Practices

While you have considerable flexibility in defining your function, remember that simplicity enhances usability for the LLM. Consider these guidelines:

* **Fewer Parameters are Better:** Minimize the number of parameters to reduce complexity.  
* **Simple Data Types:** Favor primitive data types like `str` and `int` over custom classes whenever possible.  
* **Meaningful Names:** The function's name and parameter names significantly influence how the LLM interprets and utilizes the tool. Choose names that clearly reflect the function's purpose and the meaning of its inputs. Avoid generic names like `do_stuff()` or `beAgent()`.  

## 2. Long Running Function Tool

Designed for tasks that require a significant amount of processing time without blocking the agent's execution. This tool is a subclass of `FunctionTool`.

When using a `LongRunningFunctionTool`, your function can initiate the long-running operation and optionally return an **initial result**** (e.g. the long-running operation id). Once a long running function tool is invoked the agent runner will pause the agent run and let the agent client to decide whether to continue or wait until the long-running operation finishes. The agent client can query the progress of the long-running operation and send back an intermediate or final response. The agent can then continue with other tasks. An example is the human-in-the-loop scenario where the agent needs human approval before proceeding with a task.

### How it Works

In Python, you wrap a function with `LongRunningFunctionTool`.  In Java, you pass a Method name to `LongRunningFunctionTool.create()`.


1. **Initiation:** When the LLM calls the tool, your function starts the long-running operation.

2. **Initial Updates:** Your function should optionally return an initial result (e.g. the long-running operaiton id). The ADK framework takes the result and sends it back to the LLM packaged within a `FunctionResponse`. This allows the LLM to inform the user (e.g., status, percentage complete, messages). And then the agent run is ended / paused.

3. **Continue or Wait:** After each agent run is completed. Agent client can query the progress of the long-running operation and decide whether to continue the agent run with an intermediate response (to update the progress) or wait until a final response is retrieved. Agent client should send the intermediate or final response back to the agent for the next run.

4. **Framework Handling:** The ADK framework manages the execution. It sends the intermediate or final `FunctionResponse` sent by agent client to the LLM to generate a user friendly message.

### Creating the Tool

Define your tool function and wrap it using the `LongRunningFunctionTool` class:

=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/function-tools/human_in_the_loop.py:define_long_running_function"
    ```

=== "Java"

    ```java
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.tools.LongRunningFunctionTool;
    import java.util.HashMap;
    import java.util.Map;
    
    public class ExampleLongRunningFunction {
    
      // Define your Long Running function.
      // Ask for approval for the reimbursement.
      public static Map<String, Object> askForApproval(String purpose, double amount) {
        // Simulate creating a ticket and sending a notification
        System.out.println(
            "Simulating ticket creation for purpose: " + purpose + ", amount: " + amount);
    
        // Send a notification to the approver with the link of the ticket
        Map<String, Object> result = new HashMap<>();
        result.put("status", "pending");
        result.put("approver", "Sean Zhou");
        result.put("purpose", purpose);
        result.put("amount", amount);
        result.put("ticket-id", "approval-ticket-1");
        return result;
      }
    
      public static void main(String[] args) throws NoSuchMethodException {
        // Pass the method to LongRunningFunctionTool.create
        LongRunningFunctionTool approveTool =
            LongRunningFunctionTool.create(ExampleLongRunningFunction.class, "askForApproval");
    
        // Include the tool in the agent
        LlmAgent approverAgent =
            LlmAgent.builder()
                // ...
                .tools(approveTool)
                .build();
      }
    }
    ```

### Intermediate / Final result Updates

Agent client received an event with long running function calls and check the status of the ticket. Then Agent client can send the intermediate or final response back to update the progress. The framework packages this value (even if it's None) into the content of the `FunctionResponse` sent back to the LLM.

!!! Tip "Applies to only Java ADK"

    When passing `ToolContext` with Function Tools, ensure that one of the following is true:

    * The Schema is passed with the ToolContext parameter in the function signature, like:
      ```
      @com.google.adk.tools.Annotations.Schema(name = "toolContext") ToolContext toolContext
      ```
    OR

    * The following `-parameters` flag is set to the mvn compiler plugin

    ```
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.14.0</version> <!-- or newer -->
                <configuration>
                    <compilerArgs>
                        <arg>-parameters</arg>
                    </compilerArgs>
                </configuration>
            </plugin>
        </plugins>
    </build>
    ```
    This constraint is temporary and will be removed.


=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/function-tools/human_in_the_loop.py:call_reimbursement_tool"
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/tools/LongRunningFunctionExample.java:full_code"
    ```


??? "Python complete example: File Processing Simulation"

    ```py
    --8<-- "examples/python/snippets/tools/function-tools/human_in_the_loop.py"
    ```

#### Key aspects of this example

* **`LongRunningFunctionTool`**: Wraps the supplied method/function; the framework handles sending yielded updates and the final return value as sequential FunctionResponses.

* **Agent instruction**: Directs the LLM to use the tool and understand the incoming FunctionResponse stream (progress vs. completion) for user updates.

* **Final return**: The function returns the final result dictionary, which is sent in the concluding FunctionResponse to indicate completion.

## 3. Agent-as-a-Tool

This powerful feature allows you to leverage the capabilities of other agents within your system by calling them as tools. The Agent-as-a-Tool enables you to invoke another agent to perform a specific task, effectively **delegating responsibility**. This is conceptually similar to creating a Python function that calls another agent and uses the agent's response as the function's return value.

### Key difference from sub-agents

It's important to distinguish an Agent-as-a-Tool from a Sub-Agent.

* **Agent-as-a-Tool:** When Agent A calls Agent B as a tool (using Agent-as-a-Tool), Agent B's answer is **passed back** to Agent A, which then summarizes the answer and generates a response to the user. Agent A retains control and continues to handle future user input.  

* **Sub-agent:** When Agent A calls Agent B as a sub-agent, the responsibility of answering the user is completely **transferred to Agent B**. Agent A is effectively out of the loop. All subsequent user input will be answered by Agent B.

### Usage

To use an agent as a tool, wrap the agent with the AgentTool class.

=== "Python"

    ```py
    tools=[AgentTool(agent=agent_b)]
    ```

=== "Java"

    ```java
    AgentTool.create(agent)
    ```

### Customization

The `AgentTool` class provides the following attributes for customizing its behavior:

* **skip\_summarization: bool:** If set to True, the framework will **bypass the LLM-based summarization** of the tool agent's response. This can be useful when the tool's response is already well-formatted and requires no further processing.

??? "Example"

    === "Python"

        ```py
        --8<-- "examples/python/snippets/tools/function-tools/summarizer.py"
        ```
  
    === "Java"

        ```java
        --8<-- "examples/java/snippets/src/main/java/tools/AgentToolCustomization.java:full_code"
        ```

### How it works

1. When the `main_agent` receives the long text, its instruction tells it to use the 'summarize' tool for long texts.  
2. The framework recognizes 'summarize' as an `AgentTool` that wraps the `summary_agent`.  
3. Behind the scenes, the `main_agent` will call the `summary_agent` with the long text as input.  
4. The `summary_agent` will process the text according to its instruction and generate a summary.  
5. **The response from the `summary_agent` is then passed back to the `main_agent`.**  
6. The `main_agent` can then take the summary and formulate its final response to the user (e.g., "Here's a summary of the text: ...")




================================================
FILE: docs/tools/google-cloud-tools.md
================================================
# Google Cloud Tools

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

Google Cloud tools make it easier to connect your agents to Google Cloud’s
products and services. With just a few lines of code you can use these tools to
connect your agents with:

* **Any custom APIs** that developers host in Apigee.
* **100s** of **prebuilt connectors** to enterprise systems such as Salesforce,
  Workday, and SAP.
* **Automation workflows** built using application integration.
* **Databases** such as Spanner, AlloyDB, Postgres and more using the MCP Toolbox for
  databases.

![Google Cloud Tools](../assets/google_cloud_tools.svg)

## Apigee API Hub Tools

**ApiHubToolset** lets you turn any documented API from Apigee API hub into a
tool with a few lines of code. This section shows you the step by step
instructions including setting up authentication for a secure connection to your
APIs.

**Prerequisites**

1. [Install ADK](../get-started/installation.md)
2. Install the
   [Google Cloud CLI](https://cloud.google.com/sdk/docs/install?db=bigtable-docs#installation_instructions).
3. [Apigee API hub](https://cloud.google.com/apigee/docs/apihub/what-is-api-hub)
    instance with documented (i.e. OpenAPI spec) APIs
4. Set up your project structure and create required files

```console
project_root_folder
 |
 `-- my_agent
     |-- .env
     |-- __init__.py
     |-- agent.py
     `__ tool.py
```

### Create an API Hub Toolset

Note: This tutorial includes an agent creation. If you already have an agent,
you only need to follow a subset of these steps.

1. Get your access token, so that APIHubToolset can fetch spec from API Hub API.
   In your terminal run the following command

    ```shell
    gcloud auth print-access-token
    # Prints your access token like 'ya29....'
    ```

2. Ensure that the account used has the required permissions. You can use the
   pre-defined role `roles/apihub.viewer` or assign the following permissions:

    1. **apihub.specs.get (required)**
    2. apihub.apis.get (optional)
    3. apihub.apis.list (optional)
    4. apihub.versions.get (optional)
    5. apihub.versions.list (optional)
    6. apihub.specs.list (optional)

3. Create a tool with `APIHubToolset`. Add the below to `tools.py`

    If your API requires authentication, you must configure authentication for
    the tool. The following code sample demonstrates how to configure an API
    key. ADK supports token based auth (API Key, Bearer token), service account,
    and OpenID Connect. We will soon add support for various OAuth2 flows.

    ```py
    from google.adk.tools.openapi_tool.auth.auth_helpers import token_to_scheme_credential
    from google.adk.tools.apihub_tool.apihub_toolset import APIHubToolset

    # Provide authentication for your APIs. Not required if your APIs don't required authentication.
    auth_scheme, auth_credential = token_to_scheme_credential(
        "apikey", "query", "apikey", apikey_credential_str
    )

    sample_toolset_with_auth = APIHubToolset(
        name="apihub-sample-tool",
        description="Sample Tool",
        access_token="...",  # Copy your access token generated in step 1
        apihub_resource_name="...", # API Hub resource name
        auth_scheme=auth_scheme,
        auth_credential=auth_credential,
    )
    ```

    For production deployment we recommend using a service account instead of an
    access token. In the code snippet above, use
    `service_account_json=service_account_cred_json_str` and provide your
    security account credentials instead of the token.

    For apihub\_resource\_name, if you know the specific ID of the OpenAPI Spec
    being used for your API, use
    `` `projects/my-project-id/locations/us-west1/apis/my-api-id/versions/version-id/specs/spec-id` ``.
    If you would like the Toolset to automatically pull the first available spec
    from the API, use
    `` `projects/my-project-id/locations/us-west1/apis/my-api-id` ``

4. Create your agent file Agent.py and add the created tools to your agent
   definition:

    ```py
    from google.adk.agents.llm_agent import LlmAgent
    from .tools import sample_toolset

    root_agent = LlmAgent(
        model='gemini-2.0-flash',
        name='enterprise_assistant',
        instruction='Help user, leverage the tools you have access to',
        tools=sample_toolset.get_tools(),
    )
    ```

5. Configure your `__init__.py` to expose your agent

    ```py
    from . import agent
    ```

6. Start the Google ADK Web UI and try your agent:

    ```shell
    # make sure to run `adk web` from your project_root_folder
    adk web
    ```

   Then go to [http://localhost:8000](http://localhost:8000) to try your agent from the Web UI.

---

## Application Integration Tools

With **ApplicationIntegrationToolset** you can seamlessly give your agents a
secure and governed to enterprise applications using Integration Connector’s
100+ pre-built connectors for systems like Salesforce, ServiceNow, JIRA, SAP,
and more. Support for both on-prem and SaaS applications. In addition you can
turn your existing Application Integration process automations into agentic
workflows by providing application integration workflows as tools to your ADK
agents.

**Prerequisites**

1. [Install ADK](../get-started/installation.md)
2. An existing
   [Application Integration](https://cloud.google.com/application-integration/docs/overview)
   workflow or
   [Integrations Connector](https://cloud.google.com/integration-connectors/docs/overview)
   connection you want to use with your agent
3. To use tool with default credentials: have Google Cloud CLI installed. See
   [installation guide](https://cloud.google.com/sdk/docs/install#installation_instructions)*.*

   *Run:*

   ```shell
   gcloud config set project <project-id>
   gcloud auth application-default login
   gcloud auth application-default set-quota-project <project-id>
   ```

5. Set up your project structure and create required files

    ```console
    project_root_folder
    |-- .env
    `-- my_agent
        |-- __init__.py
        |-- agent.py
        `__ tools.py
    ```

When running the agent, make sure to run adk web in project\_root\_folder

### Use Integration Connectors

Connect your agent to enterprise applications using
[Integration Connectors](https://cloud.google.com/integration-connectors/docs/overview).

**Prerequisites**

1. To use a connector from Integration Connectors, you need to [provision](https://console.cloud.google.com/integrations)
   Application Integration in the same region as your connection by clicking on "QUICK SETUP" button.


   ![Google Cloud Tools](../assets/application-integration-overview.png)

2. Go to [Connection Tool](https://console.cloud.google.com/integrations/templates/connection-tool/locations/us-central1)
   template from the template library and click on "USE TEMPLATE" button.


    ![Google Cloud Tools](../assets/use-connection-tool-template.png)

3. Fill the Integration Name as **ExecuteConnection** (It is mandatory to use this integration name only) and
   select the region same as the connection region. Click on "CREATE".

4. Publish the integration by using the "PUBLISH" button on the Application Integration Editor.


    ![Google Cloud Tools](../assets/publish-integration.png)

**Steps:**

1.  Create a tool with `ApplicationIntegrationToolset` within your `tools.py` file

    ```py
    from google.adk.tools.application_integration_tool.application_integration_toolset import ApplicationIntegrationToolset

    connector_tool = ApplicationIntegrationToolset(
        project="test-project", # TODO: replace with GCP project of the connection
        location="us-central1", #TODO: replace with location of the connection
        connection="test-connection", #TODO: replace with connection name
        entity_operations={"Entity_One": ["LIST","CREATE"], "Entity_Two": []},#empty list for actions means all operations on the entity are supported.
        actions=["action1"], #TODO: replace with actions
        service_account_credentials='{...}', # optional. Stringified json for service account key
        tool_name_prefix="tool_prefix2",
        tool_instructions="..."
    )
    ```

    **Note:**

    * You can provide service account to be used instead of using default credentials by generating [Service Account Key](https://cloud.google.com/iam/docs/keys-create-delete#creating) and providing right Application Integration and Integration Connector IAM roles to the service account.
    * To find the list of supported entities and actions for a connection, use the connectors apis: [listActions](https://cloud.google.com/integration-connectors/docs/reference/rest/v1/projects.locations.connections.connectionSchemaMetadata/listActions) or [listEntityTypes](https://cloud.google.com/integration-connectors/docs/reference/rest/v1/projects.locations.connections.connectionSchemaMetadata/listEntityTypes)


    `ApplicationIntegrationToolset` now also supports providing auth_scheme and auth_credential for dynamic OAuth2 authentication for Integration Connectors. To use it, create a tool similar to this within your `tools.py` file:

    ```py
    from google.adk.tools.application_integration_tool.application_integration_toolset import ApplicationIntegrationToolset
    from google.adk.tools.openapi_tool.auth.auth_helpers import dict_to_auth_scheme
    from google.adk.auth import AuthCredential
    from google.adk.auth import AuthCredentialTypes
    from google.adk.auth import OAuth2Auth

    oauth2_data_google_cloud = {
      "type": "oauth2",
      "flows": {
          "authorizationCode": {
              "authorizationUrl": "https://accounts.google.com/o/oauth2/auth",
              "tokenUrl": "https://oauth2.googleapis.com/token",
              "scopes": {
                  "https://www.googleapis.com/auth/cloud-platform": (
                      "View and manage your data across Google Cloud Platform"
                      " services"
                  ),
                  "https://www.googleapis.com/auth/calendar.readonly": "View your calendars"
              },
          }
      },
    }

    oauth_scheme = dict_to_auth_scheme(oauth2_data_google_cloud)

    auth_credential = AuthCredential(
      auth_type=AuthCredentialTypes.OAUTH2,
      oauth2=OAuth2Auth(
          client_id="...", #TODO: replace with client_id
          client_secret="...", #TODO: replace with client_secret
      ),
    )

    connector_tool = ApplicationIntegrationToolset(
        project="test-project", # TODO: replace with GCP project of the connection
        location="us-central1", #TODO: replace with location of the connection
        connection="test-connection", #TODO: replace with connection name
        entity_operations={"Entity_One": ["LIST","CREATE"], "Entity_Two": []},#empty list for actions means all operations on the entity are supported.
        actions=["GET_calendars/%7BcalendarId%7D/events"], #TODO: replace with actions. this one is for list events
        service_account_credentials='{...}', # optional. Stringified json for service account key
        tool_name_prefix="tool_prefix2",
        tool_instructions="...",
        auth_scheme=oauth_scheme,
        auth_credential=auth_credential
    )
    ```


2. Add the tool to your agent. Update your `agent.py` file

    ```py
    from google.adk.agents.llm_agent import LlmAgent
    from .tools import connector_tool

    root_agent = LlmAgent(
        model='gemini-2.0-flash',
        name='connector_agent',
        instruction="Help user, leverage the tools you have access to",
        tools=[connector_tool],
    )
    ```

3. Configure your  `__init__.py` to expose your agent

    ```py
    from . import agent
    ```

4. Start the Google ADK Web UI and try your agent.

    ```shell
    # make sure to run `adk web` from your project_root_folder
    adk web
    ```

   Then go to [http://localhost:8000](http://localhost:8000), and choose
   my\_agent agent (same as the agent folder name)

### Use App Integration Workflows

Use existing
[Application Integration](https://cloud.google.com/application-integration/docs/overview)
workflow as a tool for your agent or create a new one.

**Steps:**

1. Create a tool with `ApplicationIntegrationToolset` within your `tools.py` file

    ```py
    integration_tool = ApplicationIntegrationToolset(
        project="test-project", # TODO: replace with GCP project of the connection
        location="us-central1", #TODO: replace with location of the connection
        integration="test-integration", #TODO: replace with integration name
        triggers=["api_trigger/test_trigger"],#TODO: replace with trigger id(s). Empty list would mean all api triggers in the integration to be considered.
        service_account_credentials='{...}', #optional. Stringified json for service account key
        tool_name_prefix="tool_prefix1",
        tool_instructions="..."
    )
    ```

    Note: You can provide service account to be used instead of using default
        credentials by generating [Service Account Key](https://cloud.google.com/iam/docs/keys-create-delete#creating) and providing right Application Integration and Integration Connector IAM roles to the service account.

2. Add the tool to your agent. Update your `agent.py` file

    ```py
    from google.adk.agents.llm_agent import LlmAgent
    from .tools import integration_tool, connector_tool

    root_agent = LlmAgent(
        model='gemini-2.0-flash',
        name='integration_agent',
        instruction="Help user, leverage the tools you have access to",
        tools=[integration_tool],
    )
    ```

3. Configure your \`\_\_init\_\_.py\` to expose your agent

    ```py
    from . import agent
    ```

4. Start the Google ADK Web UI and try your agent.

    ```shell
    # make sure to run `adk web` from your project_root_folder
    adk web
    ```

    Then go to [http://localhost:8000](http://localhost:8000), and choose
    my\_agent agent (same as the agent folder name)

---

## Toolbox Tools for Databases

[MCP Toolbox for Databases](https://github.com/googleapis/genai-toolbox) is an
open source MCP server for databases. It was designed with enterprise-grade and
production-quality in mind. It enables you to develop tools easier, faster, and
more securely by handling the complexities such as connection pooling,
authentication, and more.

Google’s Agent Development Kit (ADK) has built in support for Toolbox. For more
information on
[getting started](https://googleapis.github.io/genai-toolbox/getting-started) or
[configuring](https://googleapis.github.io/genai-toolbox/getting-started/configure/)
Toolbox, see the
[documentation](https://googleapis.github.io/genai-toolbox/getting-started/introduction/).

![GenAI Toolbox](../assets/mcp_db_toolbox.png)

### Configure and deploy

Toolbox is an open source server that you deploy and manage yourself. For more
instructions on deploying and configuring, see the official Toolbox
documentation:

* [Installing the Server](https://googleapis.github.io/genai-toolbox/getting-started/introduction/#installing-the-server)
* [Configuring Toolbox](https://googleapis.github.io/genai-toolbox/getting-started/configure/)

### Install client SDK

ADK relies on the `toolbox-core` python package to use Toolbox. Install the
package before getting started:

```shell
pip install toolbox-core
```

### Loading Toolbox Tools

Once you’re Toolbox server is configured and up and running, you can load tools
from your server using ADK:

```python
from google.adk.agents import Agent
from toolbox_core import ToolboxSyncClient

toolbox = ToolboxSyncClient("https://127.0.0.1:5000")

# Load a specific set of tools
tools = toolbox.load_toolset('my-toolset-name'),
# Load single tool
tools = toolbox.load_tool('my-tool-name'),

root_agent = Agent(
    ...,
    tools=tools # Provide the list of tools to the Agent

)
```

### Advanced Toolbox Features

Toolbox has a variety of features to make developing Gen AI tools for databases.
For more information, read more about the following features:

* [Authenticated Parameters](https://googleapis.github.io/genai-toolbox/resources/tools/#authenticated-parameters): bind tool inputs to values from OIDC tokens automatically, making it easy to run sensitive queries without potentially leaking data
* [Authorized Invocations:](https://googleapis.github.io/genai-toolbox/resources/tools/#authorized-invocations)  restrict access to use a tool based on the users Auth token
* [OpenTelemetry](https://googleapis.github.io/genai-toolbox/how-to/export_telemetry/): get metrics and tracing from Toolbox with OpenTelemetry



================================================
FILE: docs/tools/index.md
================================================
# Tools

## What is a Tool?

In the context of ADK, a Tool represents a specific
capability provided to an AI agent, enabling it to perform actions and interact
with the world beyond its core text generation and reasoning abilities. What
distinguishes capable agents from basic language models is often their effective
use of tools.

Technically, a tool is typically a modular code component—**like a Python/ Java
function**, a class method, or even another specialized agent—designed to
execute a distinct, predefined task. These tasks often involve interacting with
external systems or data.

<img src="../assets/agent-tool-call.png" alt="Agent tool call">

### Key Characteristics

**Action-Oriented:** Tools perform specific actions, such as:

* Querying databases
* Making API requests (e.g., fetching weather data, booking systems)
* Searching the web
* Executing code snippets
* Retrieving information from documents (RAG)
* Interacting with other software or services

**Extends Agent capabilities:** They empower agents to access real-time information, affect external systems, and overcome the knowledge limitations inherent in their training data.

**Execute predefined logic:** Crucially, tools execute specific, developer-defined logic. They do not possess their own independent reasoning capabilities like the agent's core Large Language Model (LLM). The LLM reasons about which tool to use, when, and with what inputs, but the tool itself just executes its designated function.

## How Agents Use Tools

Agents leverage tools dynamically through mechanisms often involving function calling. The process generally follows these steps:

1. **Reasoning:** The agent's LLM analyzes its system instruction, conversation history, and user request.
2. **Selection:** Based on the analysis, the LLM decides on which tool, if any, to execute, based on the tools available to the agent and the docstrings that describes each tool.
3. **Invocation:** The LLM generates the required arguments (inputs) for the selected tool and triggers its execution.
4. **Observation:** The agent receives the output (result) returned by the tool.
5. **Finalization:** The agent incorporates the tool's output into its ongoing reasoning process to formulate the next response, decide the subsequent step, or determine if the goal has been achieved.

Think of the tools as a specialized toolkit that the agent's intelligent core (the LLM) can access and utilize as needed to accomplish complex tasks.

## Tool Types in ADK

ADK offers flexibility by supporting several types of tools:

1. **[Function Tools](../tools/function-tools.md):** Tools created by you, tailored to your specific application's needs.
    * **[Functions/Methods](../tools/function-tools.md#1-function-tool):** Define standard synchronous functions or methods in your code (e.g., Python def).
    * **[Agents-as-Tools](../tools/function-tools.md#3-agent-as-a-tool):** Use another, potentially specialized, agent as a tool for a parent agent.
    * **[Long Running Function Tools](../tools/function-tools.md#2-long-running-function-tool):** Support for tools that perform asynchronous operations or take significant time to complete.
2. **[Built-in Tools](../tools/built-in-tools.md):** Ready-to-use tools provided by the framework for common tasks.
        Examples: Google Search, Code Execution, Retrieval-Augmented Generation (RAG).
3. **[Third-Party Tools](../tools/third-party-tools.md):** Integrate tools seamlessly from popular external libraries.
        Examples: LangChain Tools, CrewAI Tools.

Navigate to the respective documentation pages linked above for detailed information and examples for each tool type.

## Referencing Tool in Agent’s Instructions

Within an agent's instructions, you can directly reference a tool by using its **function name.** If the tool's **function name** and **docstring** are sufficiently descriptive, your instructions can primarily focus on **when the Large Language Model (LLM) should utilize the tool**. This promotes clarity and helps the model understand the intended use of each tool.

It is **crucial to clearly instruct the agent on how to handle different return values** that a tool might produce. For example, if a tool returns an error message, your instructions should specify whether the agent should retry the operation, give up on the task, or request additional information from the user.

Furthermore, ADK supports the sequential use of tools, where the output of one tool can serve as the input for another. When implementing such workflows, it's important to **describe the intended sequence of tool usage** within the agent's instructions to guide the model through the necessary steps.

### Example

The following example showcases how an agent can use tools by **referencing their function names in its instructions**. It also demonstrates how to guide the agent to **handle different return values from tools**, such as success or error messages, and how to orchestrate the **sequential use of multiple tools** to accomplish a task.

=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/overview/weather_sentiment.py"
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/tools/WeatherSentimentAgentApp.java:full_code"
    ```

## Tool Context

For more advanced scenarios, ADK allows you to access additional contextual information within your tool function by including the special parameter `tool_context: ToolContext`. By including this in the function signature, ADK will **automatically** provide an **instance of the ToolContext** class when your tool is called during agent execution.

The **ToolContext** provides access to several key pieces of information and control levers:

* `state: State`: Read and modify the current session's state. Changes made here are tracked and persisted.

* `actions: EventActions`: Influence the agent's subsequent actions after the tool runs (e.g., skip summarization, transfer to another agent).

* `function_call_id: str`: The unique identifier assigned by the framework to this specific invocation of the tool. Useful for tracking and correlating with authentication responses. This can also be helpful when multiple tools are called within a single model response.

* `function_call_event_id: str`: This attribute provides the unique identifier of the **event** that triggered the current tool call. This can be useful for tracking and logging purposes.

* `auth_response: Any`: Contains the authentication response/credentials if an authentication flow was completed before this tool call.

* Access to Services: Methods to interact with configured services like Artifacts and Memory.

Note that you shouldn't include the `tool_context` parameter in the tool function docstring. Since `ToolContext` is automatically injected by the ADK framework *after* the LLM decides to call the tool function, it is not relevant for the LLM's decision-making and including it can confuse the LLM.

### **State Management**

The `tool_context.state` attribute provides direct read and write access to the state associated with the current session. It behaves like a dictionary but ensures that any modifications are tracked as deltas and persisted by the session service. This enables tools to maintain and share information across different interactions and agent steps.

* **Reading State**: Use standard dictionary access (`tool_context.state['my_key']`) or the `.get()` method (`tool_context.state.get('my_key', default_value)`).

* **Writing State**: Assign values directly (`tool_context.state['new_key'] = 'new_value'`). These changes are recorded in the state_delta of the resulting event.

* **State Prefixes**: Remember the standard state prefixes:

    * `app:*`: Shared across all users of the application.

    * `user:*`: Specific to the current user across all their sessions.

    * (No prefix): Specific to the current session.

    * `temp:*`: Temporary, not persisted across invocations (useful for passing data within a single run call but generally less useful inside a tool context which operates between LLM calls).

=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/overview/user_preference.py"
    ```

=== "Java"

    ```java
    import com.google.adk.tools.FunctionTool;
    import com.google.adk.tools.ToolContext;

    // Updates a user-specific preference.
    public Map<String, String> updateUserThemePreference(String value, ToolContext toolContext) {
      String userPrefsKey = "user:preferences:theme";
  
      // Get current preferences or initialize if none exist
      String preference = toolContext.state().getOrDefault(userPrefsKey, "").toString();
      if (preference.isEmpty()) {
        preference = value;
      }
  
      // Write the updated dictionary back to the state
      toolContext.state().put("user:preferences", preference);
      System.out.printf("Tool: Updated user preference %s to %s", userPrefsKey, preference);
  
      return Map.of("status", "success", "updated_preference", toolContext.state().get(userPrefsKey).toString());
      // When the LLM calls updateUserThemePreference("dark"):
      // The toolContext.state will be updated, and the change will be part of the
      // resulting tool response event's actions.stateDelta.
    }
    ```

### **Controlling Agent Flow**

The `tool_context.actions` attribute (`ToolContext.actions()` in Java) holds an **EventActions** object. Modifying attributes on this object allows your tool to influence what the agent or framework does after the tool finishes execution.

* **`skip_summarization: bool`**: (Default: False) If set to True, instructs the ADK to bypass the LLM call that typically summarizes the tool's output. This is useful if your tool's return value is already a user-ready message.

* **`transfer_to_agent: str`**: Set this to the name of another agent. The framework will halt the current agent's execution and **transfer control of the conversation to the specified agent**. This allows tools to dynamically hand off tasks to more specialized agents.

* **`escalate: bool`**: (Default: False) Setting this to True signals that the current agent cannot handle the request and should pass control up to its parent agent (if in a hierarchy). In a LoopAgent, setting **escalate=True** in a sub-agent's tool will terminate the loop.

#### Example

=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/overview/customer_support_agent.py"
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/tools/CustomerSupportAgentApp.java:full_code"
    ```

##### Explanation

* We define two agents: `main_agent` and `support_agent`. The `main_agent` is designed to be the initial point of contact.
* The `check_and_transfer` tool, when called by `main_agent`, examines the user's query.
* If the query contains the word "urgent", the tool accesses the `tool_context`, specifically **`tool_context.actions`**, and sets the transfer\_to\_agent attribute to `support_agent`.
* This action signals to the framework to **transfer the control of the conversation to the agent named `support_agent`**.
* When the `main_agent` processes the urgent query, the `check_and_transfer` tool triggers the transfer. The subsequent response would ideally come from the `support_agent`.
* For a normal query without urgency, the tool simply processes it without triggering a transfer.

This example illustrates how a tool, through EventActions in its ToolContext, can dynamically influence the flow of the conversation by transferring control to another specialized agent.

### **Authentication**

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

ToolContext provides mechanisms for tools interacting with authenticated APIs. If your tool needs to handle authentication, you might use the following:

* **`auth_response`**: Contains credentials (e.g., a token) if authentication was already handled by the framework before your tool was called (common with RestApiTool and OpenAPI security schemes).

* **`request_credential(auth_config: dict)`**: Call this method if your tool determines authentication is needed but credentials aren't available. This signals the framework to start an authentication flow based on the provided auth_config.

* **`get_auth_response()`**: Call this in a subsequent invocation (after request_credential was successfully handled) to retrieve the credentials the user provided.

For detailed explanations of authentication flows, configuration, and examples, please refer to the dedicated Tool Authentication documentation page.

### **Context-Aware Data Access Methods**

These methods provide convenient ways for your tool to interact with persistent data associated with the session or user, managed by configured services.

* **`list_artifacts()`** (or **`listArtifacts()`** in Java): Returns a list of filenames (or keys) for all artifacts currently stored for the session via the artifact_service. Artifacts are typically files (images, documents, etc.) uploaded by the user or generated by tools/agents.

* **`load_artifact(filename: str)`**: Retrieves a specific artifact by its filename from the **artifact_service**. You can optionally specify a version; if omitted, the latest version is returned. Returns a `google.genai.types.Part` object containing the artifact data and mime type, or None if not found.

* **`save_artifact(filename: str, artifact: types.Part)`**: Saves a new version of an artifact to the artifact_service. Returns the new version number (starting from 0).

* **`search_memory(query: str)`** ![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

       Queries the user's long-term memory using the configured `memory_service`. This is useful for retrieving relevant information from past interactions or stored knowledge. The structure of the **SearchMemoryResponse** depends on the specific memory service implementation but typically contains relevant text snippets or conversation excerpts.

#### Example

=== "Python"

    ```py
    --8<-- "examples/python/snippets/tools/overview/doc_analysis.py"
    ```

=== "Java"

    ```java
    // Analyzes a document using context from memory.
    // You can also list, load and save artifacts using Callback Context or LoadArtifacts tool.
    public static @NonNull Maybe<ImmutableMap<String, Object>> processDocument(
        @Annotations.Schema(description = "The name of the document to analyze.") String documentName,
        @Annotations.Schema(description = "The query for the analysis.") String analysisQuery,
        ToolContext toolContext) {
  
      // 1. List all available artifacts
      System.out.printf(
          "Listing all available artifacts %s:", toolContext.listArtifacts().blockingGet());
  
      // 2. Load an artifact to memory
      System.out.println("Tool: Attempting to load artifact: " + documentName);
      Part documentPart = toolContext.loadArtifact(documentName, Optional.empty()).blockingGet();
      if (documentPart == null) {
        System.out.println("Tool: Document '" + documentName + "' not found.");
        return Maybe.just(
            ImmutableMap.<String, Object>of(
                "status", "error", "message", "Document '" + documentName + "' not found."));
      }
      String documentText = documentPart.text().orElse("");
      System.out.println(
          "Tool: Loaded document '" + documentName + "' (" + documentText.length() + " chars).");
  
      // 3. Perform analysis (placeholder)
      String analysisResult =
          "Analysis of '"
              + documentName
              + "' regarding '"
              + analysisQuery
              + " [Placeholder Analysis Result]";
      System.out.println("Tool: Performed analysis.");
  
      // 4. Save the analysis result as a new artifact
      Part analysisPart = Part.fromText(analysisResult);
      String newArtifactName = "analysis_" + documentName;
  
      toolContext.saveArtifact(newArtifactName, analysisPart);
  
      return Maybe.just(
          ImmutableMap.<String, Object>builder()
              .put("status", "success")
              .put("analysis_artifact", newArtifactName)
              .build());
    }
    // FunctionTool processDocumentTool =
    //      FunctionTool.create(ToolContextArtifactExample.class, "processDocument");
    // In the Agent, include this function tool.
    // LlmAgent agent = LlmAgent().builder().tools(processDocumentTool).build();
    ```

By leveraging the **ToolContext**, developers can create more sophisticated and context-aware custom tools that seamlessly integrate with ADK's architecture and enhance the overall capabilities of their agents.

## Defining Effective Tool Functions

When using a method or function as an ADK Tool, how you define it significantly impacts the agent's ability to use it correctly. The agent's Large Language Model (LLM) relies heavily on the function's **name**, **parameters (arguments)**, **type hints**, and **docstring** / **source code comments** to understand its purpose and generate the correct call.

Here are key guidelines for defining effective tool functions:

* **Function Name:**
    * Use descriptive, verb-noun based names that clearly indicate the action (e.g., `get_weather`, `searchDocuments`, `schedule_meeting`).
    * Avoid generic names like `run`, `process`, `handle_data`, or overly ambiguous names like `doStuff`. Even with a good description, a name like `do_stuff` might confuse the model about when to use the tool versus, for example, `cancelFlight`.
    * The LLM uses the function name as a primary identifier during tool selection.

* **Parameters (Arguments):**
    * Your function can have any number of parameters.
    * Use clear and descriptive names (e.g., `city` instead of `c`, `search_query` instead of `q`).
    * **Provide type hints in Python**  for all parameters (e.g., `city: str`, `user_id: int`, `items: list[str]`). This is essential for ADK to generate the correct schema for the LLM.
    * Ensure all parameter types are **JSON serializable**. All java primitives as well as standard Python types like `str`, `int`, `float`, `bool`, `list`, `dict`, and their combinations are generally safe. Avoid complex custom class instances as direct parameters unless they have a clear JSON representation.
    * **Do not set default values** for parameters. E.g., `def my_func(param1: str = "default")`. Default values are not reliably supported or used by the underlying models during function call generation. All necessary information should be derived by the LLM from the context or explicitly requested if missing.
    * **`self` / `cls` Handled Automatically:** Implicit parameters like `self` (for instance methods) or `cls` (for class methods) are automatically handled by ADK and excluded from the schema shown to the LLM. You only need to define type hints and descriptions for the logical parameters your tool requires the LLM to provide.

* **Return Type:**
    * The function's return value **must be a dictionary (`dict`)** in Python or a **Map** in Java.
    * If your function returns a non-dictionary type (e.g., a string, number, list), the ADK framework will automatically wrap it into a dictionary/Map like `{'result': your_original_return_value}` before passing the result back to the model.
    * Design the dictionary/Map keys and values to be **descriptive and easily understood *by the LLM***. Remember, the model reads this output to decide its next step.
    * Include meaningful keys. For example, instead of returning just an error code like `500`, return `{'status': 'error', 'error_message': 'Database connection failed'}`.
    * It's a **highly recommended practice** to include a `status` key (e.g., `'success'`, `'error'`, `'pending'`, `'ambiguous'`) to clearly indicate the outcome of the tool execution for the model.

* **Docstring / Source Code Comments:**
    * **This is critical.** The docstring is the primary source of descriptive information for the LLM.
    * **Clearly state what the tool *does*.** Be specific about its purpose and limitations.
    * **Explain *when* the tool should be used.** Provide context or example scenarios to guide the LLM's decision-making.
    * **Describe *each parameter* clearly.** Explain what information the LLM needs to provide for that argument.
    * Describe the **structure and meaning of the expected `dict` return value**, especially the different `status` values and associated data keys.
    * **Do not describe the injected ToolContext parameter**. Avoid mentioning the optional `tool_context: ToolContext` parameter within the docstring description since it is not a parameter the LLM needs to know about. ToolContext is injected by ADK, *after* the LLM decides to call it. 

    **Example of a good definition:**

=== "Python"
    
    ```python
    def lookup_order_status(order_id: str) -> dict:
      """Fetches the current status of a customer's order using its ID.

      Use this tool ONLY when a user explicitly asks for the status of
      a specific order and provides the order ID. Do not use it for
      general inquiries.

      Args:
          order_id: The unique identifier of the order to look up.

      Returns:
          A dictionary containing the order status.
          Possible statuses: 'shipped', 'processing', 'pending', 'error'.
          Example success: {'status': 'shipped', 'tracking_number': '1Z9...'}
          Example error: {'status': 'error', 'error_message': 'Order ID not found.'}
      """
      # ... function implementation to fetch status ...
      if status := fetch_status_from_backend(order_id):
           return {"status": status.state, "tracking_number": status.tracking} # Example structure
      else:
           return {"status": "error", "error_message": f"Order ID {order_id} not found."}

    ```

=== "Java"

    ```java
    /**
     * Retrieves the current weather report for a specified city.
     *
     * @param city The city for which to retrieve the weather report.
     * @param toolContext The context for the tool.
     * @return A dictionary containing the weather information.
     */
    public static Map<String, Object> getWeatherReport(String city, ToolContext toolContext) {
        Map<String, Object> response = new HashMap<>();
        if (city.toLowerCase(Locale.ROOT).equals("london")) {
            response.put("status", "success");
            response.put(
                    "report",
                    "The current weather in London is cloudy with a temperature of 18 degrees Celsius and a"
                            + " chance of rain.");
        } else if (city.toLowerCase(Locale.ROOT).equals("paris")) {
            response.put("status", "success");
            response.put("report", "The weather in Paris is sunny with a temperature of 25 degrees Celsius.");
        } else {
            response.put("status", "error");
            response.put("error_message", String.format("Weather information for '%s' is not available.", city));
        }
        return response;
    }
    ```

* **Simplicity and Focus:**
    * **Keep Tools Focused:** Each tool should ideally perform one well-defined task.
    * **Fewer Parameters are Better:** Models generally handle tools with fewer, clearly defined parameters more reliably than those with many optional or complex ones.
    * **Use Simple Data Types:** Prefer basic types (`str`, `int`, `bool`, `float`, `List[str]`, in **Python**, or `int`, `byte`, `short`, `long`, `float`, `double`, `boolean` and `char` in **Java**) over complex custom classes or deeply nested structures as parameters when possible.
    * **Decompose Complex Tasks:** Break down functions that perform multiple distinct logical steps into smaller, more focused tools. For instance, instead of a single `update_user_profile(profile: ProfileObject)` tool, consider separate tools like `update_user_name(name: str)`, `update_user_address(address: str)`, `update_user_preferences(preferences: list[str])`, etc. This makes it easier for the LLM to select and use the correct capability.

By adhering to these guidelines, you provide the LLM with the clarity and structure it needs to effectively utilize your custom function tools, leading to more capable and reliable agent behavior.

## Toolsets: Grouping and Dynamically Providing Tools ![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/coming soon."}

Beyond individual tools, ADK introduces the concept of a **Toolset** via the `BaseToolset` interface (defined in `google.adk.tools.base_toolset`). A toolset allows you to manage and provide a collection of `BaseTool` instances, often dynamically, to an agent.

This approach is beneficial for:

*   **Organizing Related Tools:** Grouping tools that serve a common purpose (e.g., all tools for mathematical operations, or all tools interacting with a specific API).
*   **Dynamic Tool Availability:** Enabling an agent to have different tools available based on the current context (e.g., user permissions, session state, or other runtime conditions). The `get_tools` method of a toolset can decide which tools to expose.
*   **Integrating External Tool Providers:** Toolsets can act as adapters for tools coming from external systems, like an OpenAPI specification or an MCP server, converting them into ADK-compatible `BaseTool` objects.

### The `BaseToolset` Interface

Any class acting as a toolset in ADK should implement the `BaseToolset` abstract base class. This interface primarily defines two methods:

*   **`async def get_tools(...) -> list[BaseTool]:`**
    This is the core method of a toolset. When an ADK agent needs to know its available tools, it will call `get_tools()` on each `BaseToolset` instance provided in its `tools` list.
    *   It receives an optional `readonly_context` (an instance of `ReadonlyContext`). This context provides read-only access to information like the current session state (`readonly_context.state`), agent name, and invocation ID. The toolset can use this context to dynamically decide which tools to return.
    *   It **must** return a `list` of `BaseTool` instances (e.g., `FunctionTool`, `RestApiTool`).

*   **`async def close(self) -> None:`**
    This asynchronous method is called by the ADK framework when the toolset is no longer needed, for example, when an agent server is shutting down or the `Runner` is being closed. Implement this method to perform any necessary cleanup, such as closing network connections, releasing file handles, or cleaning up other resources managed by the toolset.

### Using Toolsets with Agents

You can include instances of your `BaseToolset` implementations directly in an `LlmAgent`'s `tools` list, alongside individual `BaseTool` instances.

When the agent initializes or needs to determine its available capabilities, the ADK framework will iterate through the `tools` list:

*   If an item is a `BaseTool` instance, it's used directly.
*   If an item is a `BaseToolset` instance, its `get_tools()` method is called (with the current `ReadonlyContext`), and the returned list of `BaseTool`s is added to the agent's available tools.

### Example: A Simple Math Toolset

Let's create a basic example of a toolset that provides simple arithmetic operations.

```py
--8<-- "examples/python/snippets/tools/overview/toolset_example.py:init"
```

In this example:

*   `SimpleMathToolset` implements `BaseToolset` and its `get_tools()` method returns `FunctionTool` instances for `add_numbers` and `subtract_numbers`. It also customizes their names using a prefix.
*   The `calculator_agent` is configured with both an individual `greet_tool` and an instance of `SimpleMathToolset`.
*   When `calculator_agent` is run, ADK will call `math_toolset_instance.get_tools()`. The agent's LLM will then have access to `greet_user`, `calculator_add_numbers`, and `calculator_subtract_numbers` to handle user requests.
*   The `add_numbers` tool demonstrates writing to `tool_context.state`, and the agent's instruction mentions reading this state.
*   The `close()` method is called to ensure any resources held by the toolset are released.

Toolsets offer a powerful way to organize, manage, and dynamically provide collections of tools to your ADK agents, leading to more modular, maintainable, and adaptable agentic applications.



================================================
FILE: docs/tools/mcp-tools.md
================================================
# Model Context Protocol Tools

 This guide walks you through two ways of integrating Model Context Protocol (MCP) with ADK.

## What is Model Context Protocol (MCP)?

The Model Context Protocol (MCP) is an open standard designed to standardize how Large Language Models (LLMs) like Gemini and Claude communicate with external applications, data sources, and tools. Think of it as a universal connection mechanism that simplifies how LLMs obtain context, execute actions, and interact with various systems.

MCP follows a client-server architecture, defining how **data** (resources), **interactive templates** (prompts), and **actionable functions** (tools) are exposed by an **MCP server** and consumed by an **MCP client** (which could be an LLM host application or an AI agent).

This guide covers two primary integration patterns:

1. **Using Existing MCP Servers within ADK:** An ADK agent acts as an MCP client, leveraging tools provided by external MCP servers.
2. **Exposing ADK Tools via an MCP Server:** Building an MCP server that wraps ADK tools, making them accessible to any MCP client.

## Prerequisites

Before you begin, ensure you have the following set up:

* **Set up ADK:** Follow the standard ADK [setup instructions](../get-started/quickstart.md/#venv-install) in the quickstart.
* **Install/update Python/Java:** MCP requires Python version of 3.9 or higher for Python or Java 17+.
* **Setup Node.js and npx:** **(Python only)** Many community MCP servers are distributed as Node.js packages and run using `npx`. Install Node.js (which includes npx) if you haven't already. For details, see [https://nodejs.org/en](https://nodejs.org/en).
* **Verify Installations:** **(Python only)** Confirm `adk` and `npx` are in your PATH within the activated virtual environment:

```shell
# Both commands should print the path to the executables.
which adk
which npx
```

## 1. Using MCP servers with ADK agents (ADK as an MCP client) in `adk web`

This section demonstrates how to integrate tools from external MCP (Model Context Protocol) servers into your ADK agents. This is the **most common** integration pattern when your ADK agent needs to use capabilities provided by an existing service that exposes an MCP interface. You will see how the `MCPToolset` class can be directly added to your agent's `tools` list, enabling seamless connection to an MCP server, discovery of its tools, and making them available for your agent to use. These examples primarily focus on interactions within the `adk web` development environment.

### `MCPToolset` class

The `MCPToolset` class is ADK's primary mechanism for integrating tools from an MCP server. When you include an `MCPToolset` instance in your agent's `tools` list, it automatically handles the interaction with the specified MCP server. Here's how it works:

1.  **Connection Management:** On initialization, `MCPToolset` establishes and manages the connection to the MCP server. This can be a local server process (using `StdioServerParameters` for communication over standard input/output) or a remote server (using `SseServerParams` for Server-Sent Events). The toolset also handles the graceful shutdown of this connection when the agent or application terminates.
2.  **Tool Discovery & Adaptation:** Once connected, `MCPToolset` queries the MCP server for its available tools (via the `list_tools` MCP method). It then converts the schemas of these discovered MCP tools into ADK-compatible `BaseTool` instances.
3.  **Exposure to Agent:** These adapted tools are then made available to your `LlmAgent` as if they were native ADK tools.
4.  **Proxying Tool Calls:** When your `LlmAgent` decides to use one of these tools, `MCPToolset` transparently proxies the call (using the `call_tool` MCP method) to the MCP server, sends the necessary arguments, and returns the server's response back to the agent.
5.  **Filtering (Optional):** You can use the `tool_filter` parameter when creating an `MCPToolset` to select a specific subset of tools from the MCP server, rather than exposing all of them to your agent.

The following examples demonstrate how to use `MCPToolset` within the `adk web` development environment. For scenarios where you need more fine-grained control over the MCP connection lifecycle or are not using `adk web`, refer to the "Using MCP Tools in your own Agent out of `adk web`" section later in this page.

### Example 1: File System MCP Server

This example demonstrates connecting to a local MCP server that provides file system operations.

#### Step 1: Define your Agent with `MCPToolset`

Create an `agent.py` file (e.g., in `./adk_agent_samples/mcp_agent/agent.py`). The `MCPToolset` is instantiated directly within the `tools` list of your `LlmAgent`.

*   **Important:** Replace `"/path/to/your/folder"` in the `args` list with the **absolute path** to an actual folder on your local system that the MCP server can access.
*   **Important:** Place the `.env` file in the parent directory of the `./adk_agent_samples` directory.

```python
# ./adk_agent_samples/mcp_agent/agent.py
import os # Required for path operations
from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioServerParameters

# It's good practice to define paths dynamically if possible,
# or ensure the user understands the need for an ABSOLUTE path.
# For this example, we'll construct a path relative to this file,
# assuming '/path/to/your/folder' is in the same directory as agent.py.
# REPLACE THIS with an actual absolute path if needed for your setup.
TARGET_FOLDER_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "/path/to/your/folder")
# Ensure TARGET_FOLDER_PATH is an absolute path for the MCP server.
# If you created ./adk_agent_samples/mcp_agent/your_folder,

root_agent = LlmAgent(
    model='gemini-2.0-flash',
    name='filesystem_assistant_agent',
    instruction='Help the user manage their files. You can list files, read files, etc.',
    tools=[
        MCPToolset(
            connection_params=StdioServerParameters(
                command='npx',
                args=[
                    "-y",  # Argument for npx to auto-confirm install
                    "@modelcontextprotocol/server-filesystem",
                    # IMPORTANT: This MUST be an ABSOLUTE path to a folder the
                    # npx process can access.
                    # Replace with a valid absolute path on your system.
                    # For example: "/Users/youruser/accessible_mcp_files"
                    # or use a dynamically constructed absolute path:
                    os.path.abspath(TARGET_FOLDER_PATH),
                ],
            ),
            # Optional: Filter which tools from the MCP server are exposed
            # tool_filter=['list_directory', 'read_file']
        )
    ],
)
```


#### Step 2: Create an `__init__.py` file

Ensure you have an `__init__.py` in the same directory as `agent.py` to make it a discoverable Python package for ADK.

```python
# ./adk_agent_samples/mcp_agent/__init__.py
from . import agent
```

#### Step 3: Run `adk web` and Interact

Navigate to the parent directory of `mcp_agent` (e.g., `adk_agent_samples`) in your terminal and run:

```shell
cd ./adk_agent_samples # Or your equivalent parent directory
adk web
```

!!!info "Note for Windows users"

    When hitting the `_make_subprocess_transport NotImplementedError`, consider using `adk web --no-reload` instead.


Once the ADK Web UI loads in your browser:

1.  Select the `filesystem_assistant_agent` from the agent dropdown.
2.  Try prompts like:
    *   "List files in the current directory."
    *   "Can you read the file named sample.txt?" (assuming you created it in `TARGET_FOLDER_PATH`).
    *   "What is the content of `another_file.md`?"

You should see the agent interacting with the MCP file system server, and the server's responses (file listings, file content) relayed through the agent. The `adk web` console (terminal where you ran the command) might also show logs from the `npx` process if it outputs to stderr.

<img src="../../assets/adk-tool-mcp-filesystem-adk-web-demo.png" alt="MCP with ADK Web - FileSystem Example">


### Example 2: Google Maps MCP Server

This example demonstrates connecting to the Google Maps MCP server.

#### Step 1: Get API Key and Enable APIs

1.  **Google Maps API Key:** Follow the directions at [Use API keys](https://developers.google.com/maps/documentation/javascript/get-api-key#create-api-keys) to obtain a Google Maps API Key.
2.  **Enable APIs:** In your Google Cloud project, ensure the following APIs are enabled:
    *   Directions API
    *   Routes API
    For instructions, see the [Getting started with Google Maps Platform](https://developers.google.com/maps/get-started#enable-api-sdk) documentation.

#### Step 2: Define your Agent with `MCPToolset` for Google Maps

Modify your `agent.py` file (e.g., in `./adk_agent_samples/mcp_agent/agent.py`). Replace `YOUR_GOOGLE_MAPS_API_KEY` with the actual API key you obtained.

```python
# ./adk_agent_samples/mcp_agent/agent.py
import os
from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioServerParameters

# Retrieve the API key from an environment variable or directly insert it.
# Using an environment variable is generally safer.
# Ensure this environment variable is set in the terminal where you run 'adk web'.
# Example: export GOOGLE_MAPS_API_KEY="YOUR_ACTUAL_KEY"
google_maps_api_key = os.environ.get("GOOGLE_MAPS_API_KEY")

if not google_maps_api_key:
    # Fallback or direct assignment for testing - NOT RECOMMENDED FOR PRODUCTION
    google_maps_api_key = "YOUR_GOOGLE_MAPS_API_KEY_HERE" # Replace if not using env var
    if google_maps_api_key == "YOUR_GOOGLE_MAPS_API_KEY_HERE":
        print("WARNING: GOOGLE_MAPS_API_KEY is not set. Please set it as an environment variable or in the script.")
        # You might want to raise an error or exit if the key is crucial and not found.

root_agent = LlmAgent(
    model='gemini-2.0-flash',
    name='maps_assistant_agent',
    instruction='Help the user with mapping, directions, and finding places using Google Maps tools.',
    tools=[
        MCPToolset(
            connection_params=StdioServerParameters(
                command='npx',
                args=[
                    "-y",
                    "@modelcontextprotocol/server-google-maps",
                ],
                # Pass the API key as an environment variable to the npx process
                # This is how the MCP server for Google Maps expects the key.
                env={
                    "GOOGLE_MAPS_API_KEY": google_maps_api_key
                }
            ),
            # You can filter for specific Maps tools if needed:
            # tool_filter=['get_directions', 'find_place_by_id']
        )
    ],
)
```

#### Step 3: Ensure `__init__.py` Exists

If you created this in Example 1, you can skip this. Otherwise, ensure you have an `__init__.py` in the `./adk_agent_samples/mcp_agent/` directory:

```python
# ./adk_agent_samples/mcp_agent/__init__.py
from . import agent
```

#### Step 4: Run `adk web` and Interact

1.  **Set Environment Variable (Recommended):**
    Before running `adk web`, it's best to set your Google Maps API key as an environment variable in your terminal:
    ```shell
    export GOOGLE_MAPS_API_KEY="YOUR_ACTUAL_GOOGLE_MAPS_API_KEY"
    ```
    Replace `YOUR_ACTUAL_GOOGLE_MAPS_API_KEY` with your key.

2.  **Run `adk web`**:
    Navigate to the parent directory of `mcp_agent` (e.g., `adk_agent_samples`) and run:
    ```shell
    cd ./adk_agent_samples # Or your equivalent parent directory
    adk web
    ```

3.  **Interact in the UI**:
    *   Select the `maps_assistant_agent`.
    *   Try prompts like:
        *   "Get directions from GooglePlex to SFO."
        *   "Find coffee shops near Golden Gate Park."
        *   "What's the route from Paris, France to Berlin, Germany?"

You should see the agent use the Google Maps MCP tools to provide directions or location-based information.

<img src="../../assets/adk-tool-mcp-maps-adk-web-demo.png" alt="MCP with ADK Web - Google Maps Example">


## 2. Building an MCP server with ADK tools (MCP server exposing ADK)

This pattern allows you to wrap existing ADK tools and make them available to any standard MCP client application. The example in this section exposes the ADK `load_web_page` tool through a custom-built MCP server.

### Summary of steps

You will create a standard Python MCP server application using the `mcp` library. Within this server, you will:

1.  Instantiate the ADK tool(s) you want to expose (e.g., `FunctionTool(load_web_page)`).
2.  Implement the MCP server's `@app.list_tools()` handler to advertise the ADK tool(s). This involves converting the ADK tool definition to the MCP schema using the `adk_to_mcp_tool_type` utility from `google.adk.tools.mcp_tool.conversion_utils`.
3.  Implement the MCP server's `@app.call_tool()` handler. This handler will:
    *   Receive tool call requests from MCP clients.
    *   Identify if the request targets one of your wrapped ADK tools.
    *   Execute the ADK tool's `.run_async()` method.
    *   Format the ADK tool's result into an MCP-compliant response (e.g., `mcp.types.TextContent`).

### Prerequisites

Install the MCP server library in the same Python environment as your ADK installation:

```shell
pip install mcp
```

### Step 1: Create the MCP Server Script

Create a new Python file for your MCP server, for example, `my_adk_mcp_server.py`.

### Step 2: Implement the Server Logic

Add the following code to `my_adk_mcp_server.py`. This script sets up an MCP server that exposes the ADK `load_web_page` tool.

```python
# my_adk_mcp_server.py
import asyncio
import json
import os
from dotenv import load_dotenv

# MCP Server Imports
from mcp import types as mcp_types # Use alias to avoid conflict
from mcp.server.lowlevel import Server, NotificationOptions
from mcp.server.models import InitializationOptions
import mcp.server.stdio # For running as a stdio server

# ADK Tool Imports
from google.adk.tools.function_tool import FunctionTool
from google.adk.tools.load_web_page import load_web_page # Example ADK tool
# ADK <-> MCP Conversion Utility
from google.adk.tools.mcp_tool.conversion_utils import adk_to_mcp_tool_type

# --- Load Environment Variables (If ADK tools need them, e.g., API keys) ---
load_dotenv() # Create a .env file in the same directory if needed

# --- Prepare the ADK Tool ---
# Instantiate the ADK tool you want to expose.
# This tool will be wrapped and called by the MCP server.
print("Initializing ADK load_web_page tool...")
adk_tool_to_expose = FunctionTool(load_web_page)
print(f"ADK tool '{adk_tool_to_expose.name}' initialized and ready to be exposed via MCP.")
# --- End ADK Tool Prep ---

# --- MCP Server Setup ---
print("Creating MCP Server instance...")
# Create a named MCP Server instance using the mcp.server library
app = Server("adk-tool-exposing-mcp-server")

# Implement the MCP server's handler to list available tools
@app.list_tools()
async def list_mcp_tools() -> list[mcp_types.Tool]:
    """MCP handler to list tools this server exposes."""
    print("MCP Server: Received list_tools request.")
    # Convert the ADK tool's definition to the MCP Tool schema format
    mcp_tool_schema = adk_to_mcp_tool_type(adk_tool_to_expose)
    print(f"MCP Server: Advertising tool: {mcp_tool_schema.name}")
    return [mcp_tool_schema]

# Implement the MCP server's handler to execute a tool call
@app.call_tool()
async def call_mcp_tool(
    name: str, arguments: dict
) -> list[mcp_types.Content]: # MCP uses mcp_types.Content
    """MCP handler to execute a tool call requested by an MCP client."""
    print(f"MCP Server: Received call_tool request for '{name}' with args: {arguments}")

    # Check if the requested tool name matches our wrapped ADK tool
    if name == adk_tool_to_expose.name:
        try:
            # Execute the ADK tool's run_async method.
            # Note: tool_context is None here because this MCP server is
            # running the ADK tool outside of a full ADK Runner invocation.
            # If the ADK tool requires ToolContext features (like state or auth),
            # this direct invocation might need more sophisticated handling.
            adk_tool_response = await adk_tool_to_expose.run_async(
                args=arguments,
                tool_context=None,
            )
            print(f"MCP Server: ADK tool '{name}' executed. Response: {adk_tool_response}")

            # Format the ADK tool's response (often a dict) into an MCP-compliant format.
            # Here, we serialize the response dictionary as a JSON string within TextContent.
            # Adjust formatting based on the ADK tool's output and client needs.
            response_text = json.dumps(adk_tool_response, indent=2)
            # MCP expects a list of mcp_types.Content parts
            return [mcp_types.TextContent(type="text", text=response_text)]

        except Exception as e:
            print(f"MCP Server: Error executing ADK tool '{name}': {e}")
            # Return an error message in MCP format
            error_text = json.dumps({"error": f"Failed to execute tool '{name}': {str(e)}"})
            return [mcp_types.TextContent(type="text", text=error_text)]
    else:
        # Handle calls to unknown tools
        print(f"MCP Server: Tool '{name}' not found/exposed by this server.")
        error_text = json.dumps({"error": f"Tool '{name}' not implemented by this server."})
        return [mcp_types.TextContent(type="text", text=error_text)]

# --- MCP Server Runner ---
async def run_mcp_stdio_server():
    """Runs the MCP server, listening for connections over standard input/output."""
    # Use the stdio_server context manager from the mcp.server.stdio library
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        print("MCP Stdio Server: Starting handshake with client...")
        await app.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name=app.name, # Use the server name defined above
                server_version="0.1.0",
                capabilities=app.get_capabilities(
                    # Define server capabilities - consult MCP docs for options
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )
        print("MCP Stdio Server: Run loop finished or client disconnected.")

if __name__ == "__main__":
    print("Launching MCP Server to expose ADK tools via stdio...")
    try:
        asyncio.run(run_mcp_stdio_server())
    except KeyboardInterrupt:
        print("\nMCP Server (stdio) stopped by user.")
    except Exception as e:
        print(f"MCP Server (stdio) encountered an error: {e}")
    finally:
        print("MCP Server (stdio) process exiting.")
# --- End MCP Server ---
```

### Step 3: Test your Custom MCP Server with an ADK Agent

Now, create an ADK agent that will act as a client to the MCP server you just built. This ADK agent will use `MCPToolset` to connect to your `my_adk_mcp_server.py` script.

Create an `agent.py` (e.g., in `./adk_agent_samples/mcp_client_agent/agent.py`):

```python
# ./adk_agent_samples/mcp_client_agent/agent.py
import os
from google.adk.agents import LlmAgent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, StdioServerParameters

# IMPORTANT: Replace this with the ABSOLUTE path to your my_adk_mcp_server.py script
PATH_TO_YOUR_MCP_SERVER_SCRIPT = "/path/to/your/my_adk_mcp_server.py" # <<< REPLACE

if PATH_TO_YOUR_MCP_SERVER_SCRIPT == "/path/to/your/my_adk_mcp_server.py":
    print("WARNING: PATH_TO_YOUR_MCP_SERVER_SCRIPT is not set. Please update it in agent.py.")
    # Optionally, raise an error if the path is critical

root_agent = LlmAgent(
    model='gemini-2.0-flash',
    name='web_reader_mcp_client_agent',
    instruction="Use the 'load_web_page' tool to fetch content from a URL provided by the user.",
    tools=[
        MCPToolset(
            connection_params=StdioServerParameters(
                command='python3', # Command to run your MCP server script
                args=[PATH_TO_YOUR_MCP_SERVER_SCRIPT], # Argument is the path to the script
            )
            # tool_filter=['load_web_page'] # Optional: ensure only specific tools are loaded
        )
    ],
)
```

And an `__init__.py` in the same directory:
```python
# ./adk_agent_samples/mcp_client_agent/__init__.py
from . import agent
```

**To run the test:**

1.  **Start your custom MCP server (optional, for separate observation):**
    You can run your `my_adk_mcp_server.py` directly in one terminal to see its logs:
    ```shell
    python3 /path/to/your/my_adk_mcp_server.py
    ```
    It will print "Launching MCP Server..." and wait. The ADK agent (run via `adk web`) will then connect to this process if the `command` in `StdioServerParameters` is set up to execute it.
    *(Alternatively, `MCPToolset` will start this server script as a subprocess automatically when the agent initializes).*

2.  **Run `adk web` for the client agent:**
    Navigate to the parent directory of `mcp_client_agent` (e.g., `adk_agent_samples`) and run:
    ```shell
    cd ./adk_agent_samples # Or your equivalent parent directory
    adk web
    ```

3.  **Interact in the ADK Web UI:**
    *   Select the `web_reader_mcp_client_agent`.
    *   Try a prompt like: "Load the content from https://example.com"

The ADK agent (`web_reader_mcp_client_agent`) will use `MCPToolset` to start and connect to your `my_adk_mcp_server.py`. Your MCP server will receive the `call_tool` request, execute the ADK `load_web_page` tool, and return the result. The ADK agent will then relay this information. You should see logs from both the ADK Web UI (and its terminal) and potentially from your `my_adk_mcp_server.py` terminal if you ran it separately.

This example demonstrates how ADK tools can be encapsulated within an MCP server, making them accessible to a broader range of MCP-compliant clients, not just ADK agents.

Refer to the [documentation](https://modelcontextprotocol.io/quickstart/server#core-mcp-concepts), to try it out with Claude Desktop.

## Using MCP Tools in your own Agent out of `adk web`

This section is relevant to you if:

* You are developing your own Agent using ADK
* And, you are **NOT** using `adk web`,
* And, you are exposing the agent via your own UI


Using MCP Tools requires a different setup than using regular tools, due to the fact that specs for MCP Tools are fetched asynchronously
from the MCP Server running remotely, or in another process.

The following example is modified from the "Example 1: File System MCP Server" example above. The main differences are:

1. Your tool and agent are created asynchronously
2. You need to properly manage the exit stack, so that your agents and tools are destructed properly when the connection to MCP Server is closed.

```python
# agent.py (modify get_tools_async and other parts as needed)
# ./adk_agent_samples/mcp_agent/agent.py
import os
import asyncio
from dotenv import load_dotenv
from google.genai import types
from google.adk.agents.llm_agent import LlmAgent
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.artifacts.in_memory_artifact_service import InMemoryArtifactService # Optional
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, SseServerParams, StdioServerParameters

# Load environment variables from .env file in the parent directory
# Place this near the top, before using env vars like API keys
load_dotenv('../.env')

# Ensure TARGET_FOLDER_PATH is an absolute path for the MCP server.
TARGET_FOLDER_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "/path/to/your/folder")

# --- Step 1: Agent Definition ---
async def get_agent_async():
  """Creates an ADK Agent equipped with tools from the MCP Server."""
  toolset = MCPToolset(
      # Use StdioServerParameters for local process communication
      connection_params=StdioServerParameters(
          command='npx', # Command to run the server
          args=["-y",    # Arguments for the command
                "@modelcontextprotocol/server-filesystem",
                TARGET_FOLDER_PATH],
      ),
      tool_filter=['read_file', 'list_directory'] # Optional: filter specific tools
      # For remote servers, you would use SseServerParams instead:
      # connection_params=SseServerParams(url="http://remote-server:port/path", headers={...})
  )

  # Use in an agent
  root_agent = LlmAgent(
      model='gemini-2.0-flash', # Adjust model name if needed based on availability
      name='enterprise_assistant',
      instruction='Help user accessing their file systems',
      tools=[toolset], # Provide the MCP tools to the ADK agent
  )
  return root_agent, toolset

# --- Step 2: Main Execution Logic ---
async def async_main():
  session_service = InMemorySessionService()
  # Artifact service might not be needed for this example
  artifacts_service = InMemoryArtifactService()

  session = await session_service.create_session(
      state={}, app_name='mcp_filesystem_app', user_id='user_fs'
  )

  # TODO: Change the query to be relevant to YOUR specified folder.
  # e.g., "list files in the 'documents' subfolder" or "read the file 'notes.txt'"
  query = "list files in the tests folder"
  print(f"User Query: '{query}'")
  content = types.Content(role='user', parts=[types.Part(text=query)])

  root_agent, toolset = await get_agent_async()

  runner = Runner(
      app_name='mcp_filesystem_app',
      agent=root_agent,
      artifact_service=artifacts_service, # Optional
      session_service=session_service,
  )

  print("Running agent...")
  events_async = runner.run_async(
      session_id=session.id, user_id=session.user_id, new_message=content
  )

  async for event in events_async:
    print(f"Event received: {event}")

  # Cleanup is handled automatically by the agent framework
  # But you can also manually close if needed:
  print("Closing MCP server connection...")
  await toolset.close()
  print("Cleanup complete.")

if __name__ == '__main__':
  try:
    asyncio.run(async_main())
  except Exception as e:
    print(f"An error occurred: {e}")
```


## Key considerations

When working with MCP and ADK, keep these points in mind:

* **Protocol vs. Library:** MCP is a protocol specification, defining communication rules. ADK is a Python library/framework for building agents. MCPToolset bridges these by implementing the client side of the MCP protocol within the ADK framework. Conversely, building an MCP server in Python requires using the model-context-protocol library.

* **ADK Tools vs. MCP Tools:**

    * ADK Tools (BaseTool, FunctionTool, AgentTool, etc.) are Python objects designed for direct use within the ADK's LlmAgent and Runner.
    * MCP Tools are capabilities exposed by an MCP Server according to the protocol's schema. MCPToolset makes these look like ADK tools to an LlmAgent.
    * Langchain/CrewAI Tools are specific implementations within those libraries, often simple functions or classes, lacking the server/protocol structure of MCP. ADK offers wrappers (LangchainTool, CrewaiTool) for some interoperability.

* **Asynchronous nature:** Both ADK and the MCP Python library are heavily based on the asyncio Python library. Tool implementations and server handlers should generally be async functions.

* **Stateful sessions (MCP):** MCP establishes stateful, persistent connections between a client and server instance. This differs from typical stateless REST APIs.

    * **Deployment:** This statefulness can pose challenges for scaling and deployment, especially for remote servers handling many users. The original MCP design often assumed client and server were co-located. Managing these persistent connections requires careful infrastructure considerations (e.g., load balancing, session affinity).
    * **ADK MCPToolset:** Manages this connection lifecycle. The exit\_stack pattern shown in the examples is crucial for ensuring the connection (and potentially the server process) is properly terminated when the ADK agent finishes.

## Further Resources

* [Model Context Protocol Documentation](https://modelcontextprotocol.io/ )
* [MCP Specification](https://modelcontextprotocol.io/specification/)
* [MCP Python SDK & Examples](https://github.com/modelcontextprotocol/)



================================================
FILE: docs/tools/openapi-tools.md
================================================
# OpenAPI Integration

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

## Integrating REST APIs with OpenAPI

ADK simplifies interacting with external REST APIs by automatically generating callable tools directly from an [OpenAPI Specification (v3.x)](https://swagger.io/specification/). This eliminates the need to manually define individual function tools for each API endpoint.

!!! tip "Core Benefit"
    Use `OpenAPIToolset` to instantly create agent tools (`RestApiTool`) from your existing API documentation (OpenAPI spec), enabling agents to seamlessly call your web services.

## Key Components

* **`OpenAPIToolset`**: This is the primary class you'll use. You initialize it with your OpenAPI specification, and it handles the parsing and generation of tools.
* **`RestApiTool`**: This class represents a single, callable API operation (like `GET /pets/{petId}` or `POST /pets`). `OpenAPIToolset` creates one `RestApiTool` instance for each operation defined in your spec.

## How it Works

The process involves these main steps when you use `OpenAPIToolset`:

1. **Initialization & Parsing**:
    * You provide the OpenAPI specification to `OpenAPIToolset` either as a Python dictionary, a JSON string, or a YAML string.
    * The toolset internally parses the spec, resolving any internal references (`$ref`) to understand the complete API structure.

2. **Operation Discovery**:
    * It identifies all valid API operations (e.g., `GET`, `POST`, `PUT`, `DELETE`) defined within the `paths` object of your specification.

3. **Tool Generation**:
    * For each discovered operation, `OpenAPIToolset` automatically creates a corresponding `RestApiTool` instance.
    * **Tool Name**: Derived from the `operationId` in the spec (converted to `snake_case`, max 60 chars). If `operationId` is missing, a name is generated from the method and path.
    * **Tool Description**: Uses the `summary` or `description` from the operation for the LLM.
    * **API Details**: Stores the required HTTP method, path, server base URL, parameters (path, query, header, cookie), and request body schema internally.

4. **`RestApiTool` Functionality**: Each generated `RestApiTool`:
    * **Schema Generation**: Dynamically creates a `FunctionDeclaration` based on the operation's parameters and request body. This schema tells the LLM how to call the tool (what arguments are expected).
    * **Execution**: When called by the LLM, it constructs the correct HTTP request (URL, headers, query params, body) using the arguments provided by the LLM and the details from the OpenAPI spec. It handles authentication (if configured) and executes the API call using the `requests` library.
    * **Response Handling**: Returns the API response (typically JSON) back to the agent flow.

5. **Authentication**: You can configure global authentication (like API keys or OAuth - see [Authentication](../tools/authentication.md) for details) when initializing `OpenAPIToolset`. This authentication configuration is automatically applied to all generated `RestApiTool` instances.

## Usage Workflow

Follow these steps to integrate an OpenAPI spec into your agent:

1. **Obtain Spec**: Get your OpenAPI specification document (e.g., load from a `.json` or `.yaml` file, fetch from a URL).
2. **Instantiate Toolset**: Create an `OpenAPIToolset` instance, passing the spec content and type (`spec_str`/`spec_dict`, `spec_str_type`). Provide authentication details (`auth_scheme`, `auth_credential`) if required by the API.

    ```python
    from google.adk.tools.openapi_tool.openapi_spec_parser.openapi_toolset import OpenAPIToolset

    # Example with a JSON string
    openapi_spec_json = '...' # Your OpenAPI JSON string
    toolset = OpenAPIToolset(spec_str=openapi_spec_json, spec_str_type="json")

    # Example with a dictionary
    # openapi_spec_dict = {...} # Your OpenAPI spec as a dict
    # toolset = OpenAPIToolset(spec_dict=openapi_spec_dict)
    ```

3. **Add to Agent**: Include the retrieved tools in your `LlmAgent`'s `tools` list.

    ```python
    from google.adk.agents import LlmAgent

    my_agent = LlmAgent(
        name="api_interacting_agent",
        model="gemini-2.0-flash", # Or your preferred model
        tools=[toolset], # Pass the toolset
        # ... other agent config ...
    )
    ```

4. **Instruct Agent**: Update your agent's instructions to inform it about the new API capabilities and the names of the tools it can use (e.g., `list_pets`, `create_pet`). The tool descriptions generated from the spec will also help the LLM.
5. **Run Agent**: Execute your agent using the `Runner`. When the LLM determines it needs to call one of the APIs, it will generate a function call targeting the appropriate `RestApiTool`, which will then handle the HTTP request automatically.

## Example

This example demonstrates generating tools from a simple Pet Store OpenAPI spec (using `httpbin.org` for mock responses) and interacting with them via an agent.

???+ "Code: Pet Store API"

    ```python title="openapi_example.py"
    --8<-- "examples/python/snippets/tools/openapi_tool.py"
    ```



================================================
FILE: docs/tools/third-party-tools.md
================================================
# Third Party Tools

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

ADK is designed to be **highly extensible, allowing you to seamlessly integrate tools from other AI Agent frameworks** like CrewAI and LangChain. This interoperability is crucial because it allows for faster development time and allows you to reuse existing tools.

## 1. Using LangChain Tools

ADK provides the `LangchainTool` wrapper to integrate tools from the LangChain ecosystem into your agents.

### Example: Web Search using LangChain's Tavily tool

[Tavily](https://tavily.com/) provides a search API that returns answers derived from real-time search results, intended for use by applications like AI agents.

1. Follow [ADK installation and setup](../get-started/installation.md) guide.

2. **Install Dependencies:** Ensure you have the necessary LangChain packages installed. For example, to use the Tavily search tool, install its specific dependencies:

    ```bash
    pip install langchain_community tavily-python
    ```

3. Obtain a [Tavily](https://tavily.com/) API KEY and export it as an environment variable.

    ```bash
    export TAVILY_API_KEY=<REPLACE_WITH_API_KEY>
    ```

4. **Import:** Import the `LangchainTool` wrapper from ADK and the specific `LangChain` tool you wish to use (e.g, `TavilySearchResults`).

    ```py
    from google.adk.tools.langchain_tool import LangchainTool
    from langchain_community.tools import TavilySearchResults
    ```

5. **Instantiate & Wrap:** Create an instance of your LangChain tool and pass it to the `LangchainTool` constructor.

    ```py
    # Instantiate the LangChain tool
    tavily_tool_instance = TavilySearchResults(
        max_results=5,
        search_depth="advanced",
        include_answer=True,
        include_raw_content=True,
        include_images=True,
    )

    # Wrap it with LangchainTool for ADK
    adk_tavily_tool = LangchainTool(tool=tavily_tool_instance)
    ```

6. **Add to Agent:** Include the wrapped `LangchainTool` instance in your agent's `tools` list during definition.

    ```py
    from google.adk import Agent

    # Define the ADK agent, including the wrapped tool
    my_agent = Agent(
        name="langchain_tool_agent",
        model="gemini-2.0-flash",
        description="Agent to answer questions using TavilySearch.",
        instruction="I can answer your questions by searching the internet. Just ask me anything!",
        tools=[adk_tavily_tool] # Add the wrapped tool here
    )
    ```

### Full Example: Tavily Search

Here's the full code combining the steps above to create and run an agent using the LangChain Tavily search tool.

```py
--8<-- "examples/python/snippets/tools/third-party/langchain_tavily_search.py"
```

## 2. Using CrewAI tools

ADK provides the `CrewaiTool` wrapper to integrate tools from the CrewAI library.

### Example: Web Search using CrewAI's Serper API

[Serper API](https://serper.dev/) provides access to Google Search results programmatically. It allows applications, like AI agents, to perform real-time Google searches (including news, images, etc.) and get structured data back without needing to scrape web pages directly.

1. Follow [ADK installation and setup](../get-started/installation.md) guide.

2. **Install Dependencies:** Install the necessary CrewAI tools package. For example, to use the SerperDevTool:

    ```bash
    pip install crewai-tools
    ```

3. Obtain a [Serper API KEY](https://serper.dev/) and export it as an environment variable.

    ```bash
    export SERPER_API_KEY=<REPLACE_WITH_API_KEY>
    ```

4. **Import:** Import `CrewaiTool` from ADK and the desired CrewAI tool (e.g, `SerperDevTool`).

    ```py
    from google.adk.tools.crewai_tool import CrewaiTool
    from crewai_tools import SerperDevTool
    ```

5. **Instantiate & Wrap:** Create an instance of the CrewAI tool. Pass it to the `CrewaiTool` constructor. **Crucially, you must provide a name and description** to the ADK wrapper, as these are used by ADK's underlying model to understand when to use the tool.

    ```py
    # Instantiate the CrewAI tool
    serper_tool_instance = SerperDevTool(
        n_results=10,
        save_file=False,
        search_type="news",
    )

    # Wrap it with CrewaiTool for ADK, providing name and description
    adk_serper_tool = CrewaiTool(
        name="InternetNewsSearch",
        description="Searches the internet specifically for recent news articles using Serper.",
        tool=serper_tool_instance
    )
    ```

6. **Add to Agent:** Include the wrapped `CrewaiTool` instance in your agent's `tools` list.

    ```py
    from google.adk import Agent
 
    # Define the ADK agent
    my_agent = Agent(
        name="crewai_search_agent",
        model="gemini-2.0-flash",
        description="Agent to find recent news using the Serper search tool.",
        instruction="I can find the latest news for you. What topic are you interested in?",
        tools=[adk_serper_tool] # Add the wrapped tool here
    )
    ```

### Full Example: Serper API

Here's the full code combining the steps above to create and run an agent using the CrewAI Serper API search tool.

```py
--8<-- "examples/python/snippets/tools/third-party/crewai_serper_search.py"
```


Directory structure:
└── runtime/
    ├── index.md
    └── runconfig.md

================================================
FILE: docs/runtime/index.md
================================================
# Runtime

## What is runtime?

The ADK Runtime is the underlying engine that powers your agent application during user interactions. It's the system that takes your defined agents, tools, and callbacks and orchestrates their execution in response to user input, managing the flow of information, state changes, and interactions with external services like LLMs or storage.

Think of the Runtime as the **"engine"** of your agentic application. You define the parts (agents, tools), and the Runtime handles how they connect and run together to fulfill a user's request.

## Core Idea: The Event Loop

At its heart, the ADK Runtime operates on an **Event Loop**. This loop facilitates a back-and-forth communication between the `Runner` component and your defined "Execution Logic" (which includes your Agents, the LLM calls they make, Callbacks, and Tools).

![intro_components.png](../assets/event-loop.png)

In simple terms:

1. The `Runner` receives a user query and asks the main `Agent` to start processing.
2. The `Agent` (and its associated logic) runs until it has something to report (like a response, a request to use a tool, or a state change) – it then **yields** or **emits** an `Event`.
3. The `Runner` receives this `Event`, processes any associated actions (like saving state changes via `Services`), and forwards the event onwards (e.g., to the user interface).
4. Only *after* the `Runner` has processed the event does the `Agent`'s logic **resume** from where it paused, now potentially seeing the effects of the changes committed by the Runner.
5. This cycle repeats until the agent has no more events to yield for the current user query.

This event-driven loop is the fundamental pattern governing how ADK executes your agent code.

## The Heartbeat: The Event Loop - Inner workings

The Event Loop is the core operational pattern defining the interaction between the `Runner` and your custom code (Agents, Tools, Callbacks, collectively referred to as "Execution Logic" or "Logic Components" in the design document). It establishes a clear division of responsibilities:

!!! Note
    The specific method names and parameter names may vary slightly by SDK language (e.g., `agent_to_run.runAsync(...)` in Java, `agent_to_run.run_async(...)` in Python). Refer to the language-specific API documentation for details.

### Runner's Role (Orchestrator)

The `Runner` acts as the central coordinator for a single user invocation. Its responsibilities in the loop are:

1. **Initiation:** Receives the end user's query (`new_message`) and typically appends it to the session history via the `SessionService`.
2. **Kick-off:** Starts the event generation process by calling the main agent's execution method (e.g., `agent_to_run.run_async(...)`).
3. **Receive & Process:** Waits for the agent logic to `yield` or `emit` an `Event`. Upon receiving an event, the Runner **promptly processes** it. This involves:
      * Using configured `Services` (`SessionService`, `ArtifactService`, `MemoryService`) to commit changes indicated in `event.actions` (like `state_delta`, `artifact_delta`).
      * Performing other internal bookkeeping.
4. **Yield Upstream:** Forwards the processed event onwards (e.g., to the calling application or UI for rendering).
5. **Iterate:** Signals the agent logic that processing is complete for the yielded event, allowing it to resume and generate the *next* event.

*Conceptual Runner Loop:*

=== "Python"

    ```py
    # Simplified view of Runner's main loop logic
    def run(new_query, ...) -> Generator[Event]:
        # 1. Append new_query to session event history (via SessionService)
        session_service.append_event(session, Event(author='user', content=new_query))
    
        # 2. Kick off event loop by calling the agent
        agent_event_generator = agent_to_run.run_async(context)
    
        async for event in agent_event_generator:
            # 3. Process the generated event and commit changes
            session_service.append_event(session, event) # Commits state/artifact deltas etc.
            # memory_service.update_memory(...) # If applicable
            # artifact_service might have already been called via context during agent run
    
            # 4. Yield event for upstream processing (e.g., UI rendering)
            yield event
            # Runner implicitly signals agent generator can continue after yielding
    ```

=== "Java"

    ```java
    // Simplified conceptual view of the Runner's main loop logic in Java.
    public Flowable<Event> runConceptual(
        Session session,                  
        InvocationContext invocationContext, 
        Content newQuery                
        ) {
    
        // 1. Append new_query to session event history (via SessionService)
        // ...
        sessionService.appendEvent(session, userEvent).blockingGet();
    
        // 2. Kick off event stream by calling the agent
        Flowable<Event> agentEventStream = agentToRun.runAsync(invocationContext);
    
        // 3. Process each generated event, commit changes, and "yield" or "emit"
        return agentEventStream.map(event -> {
            // This mutates the session object (adds event, applies stateDelta).
            // The return value of appendEvent (a Single<Event>) is conceptually
            // just the event itself after processing.
            sessionService.appendEvent(session, event).blockingGet(); // Simplified blocking call
    
            // memory_service.update_memory(...) // If applicable - conceptual
            // artifact_service might have already been called via context during agent run
    
            // 4. "Yield" event for upstream processing
            //    In RxJava, returning the event in map effectively yields it to the next operator or subscriber.
            return event;
        });
    }
    ```

### Execution Logic's Role (Agent, Tool, Callback)

Your code within agents, tools, and callbacks is responsible for the actual computation and decision-making. Its interaction with the loop involves:

1. **Execute:** Runs its logic based on the current `InvocationContext`, including the session state *as it was when execution resumed*.
2. **Yield:** When the logic needs to communicate (send a message, call a tool, report a state change), it constructs an `Event` containing the relevant content and actions, and then `yield`s this event back to the `Runner`.
3. **Pause:** Crucially, execution of the agent logic **pauses immediately** after the `yield` statement (or `return` in RxJava). It waits for the `Runner` to complete step 3 (processing and committing).
4. **Resume:** *Only after* the `Runner` has processed the yielded event does the agent logic resume execution from the statement immediately following the `yield`.
5. **See Updated State:** Upon resumption, the agent logic can now reliably access the session state (`ctx.session.state`) reflecting the changes that were committed by the `Runner` from the *previously yielded* event.

*Conceptual Execution Logic:*

=== "Python"

    ```py
    # Simplified view of logic inside Agent.run_async, callbacks, or tools
    
    # ... previous code runs based on current state ...
    
    # 1. Determine a change or output is needed, construct the event
    # Example: Updating state
    update_data = {'field_1': 'value_2'}
    event_with_state_change = Event(
        author=self.name,
        actions=EventActions(state_delta=update_data),
        content=types.Content(parts=[types.Part(text="State updated.")])
        # ... other event fields ...
    )
    
    # 2. Yield the event to the Runner for processing & commit
    yield event_with_state_change
    # <<<<<<<<<<<< EXECUTION PAUSES HERE >>>>>>>>>>>>
    
    # <<<<<<<<<<<< RUNNER PROCESSES & COMMITS THE EVENT >>>>>>>>>>>>
    
    # 3. Resume execution ONLY after Runner is done processing the above event.
    # Now, the state committed by the Runner is reliably reflected.
    # Subsequent code can safely assume the change from the yielded event happened.
    val = ctx.session.state['field_1']
    # here `val` is guaranteed to be "value_2" (assuming Runner committed successfully)
    print(f"Resumed execution. Value of field_1 is now: {val}")
    
    # ... subsequent code continues ...
    # Maybe yield another event later...
    ```

=== "Java"

    ```java
    // Simplified view of logic inside Agent.runAsync, callbacks, or tools
    // ... previous code runs based on current state ...
    
    // 1. Determine a change or output is needed, construct the event
    // Example: Updating state
    ConcurrentMap<String, Object> updateData = new ConcurrentHashMap<>();
    updateData.put("field_1", "value_2");
    
    EventActions actions = EventActions.builder().stateDelta(updateData).build();
    Content eventContent = Content.builder().parts(Part.fromText("State updated.")).build();
    
    Event eventWithStateChange = Event.builder()
        .author(self.name())
        .actions(actions)
        .content(Optional.of(eventContent))
        // ... other event fields ...
        .build();
    
    // 2. "Yield" the event. In RxJava, this means emitting it into the stream.
    //    The Runner (or upstream consumer) will subscribe to this Flowable.
    //    When the Runner receives this event, it will process it (e.g., call sessionService.appendEvent).
    //    The 'appendEvent' in Java ADK mutates the 'Session' object held within 'ctx' (InvocationContext).
    
    // <<<<<<<<<<<< CONCEPTUAL PAUSE POINT >>>>>>>>>>>>
    // In RxJava, the emission of 'eventWithStateChange' happens, and then the stream
    // might continue with a 'flatMap' or 'concatMap' operator that represents
    // the logic *after* the Runner has processed this event.
    
    // To model the "resume execution ONLY after Runner is done processing":
    // The Runner's `appendEvent` is usually an async operation itself (returns Single<Event>).
    // The agent's flow needs to be structured such that subsequent logic
    // that depends on the committed state runs *after* that `appendEvent` completes.
    
    // This is how the Runner typically orchestrates it:
    // Runner:
    //   agent.runAsync(ctx)
    //     .concatMapEager(eventFromAgent ->
    //         sessionService.appendEvent(ctx.session(), eventFromAgent) // This updates ctx.session().state()
    //             .toFlowable() // Emits the event after it's processed
    //     )
    //     .subscribe(processedEvent -> { /* UI renders processedEvent */ });
    
    // So, within the agent's own logic, if it needs to do something *after* an event it yielded
    // has been processed and its state changes are reflected in ctx.session().state(),
    // that subsequent logic would typically be in another step of its reactive chain.
    
    // For this conceptual example, we'll emit the event, and then simulate the "resume"
    // as a subsequent operation in the Flowable chain.
    
    return Flowable.just(eventWithStateChange) // Step 2: Yield the event
        .concatMap(yieldedEvent -> {
            // <<<<<<<<<<<< RUNNER CONCEPTUALLY PROCESSES & COMMITS THE EVENT >>>>>>>>>>>>
            // At this point, in a real runner, ctx.session().appendEvent(yieldedEvent) would have been called
            // by the Runner, and ctx.session().state() would be updated.
            // Since we are *inside* the agent's conceptual logic trying to model this,
            // we assume the Runner's action has implicitly updated our 'ctx.session()'.
    
            // 3. Resume execution.
            // Now, the state committed by the Runner (via sessionService.appendEvent)
            // is reliably reflected in ctx.session().state().
            Object val = ctx.session().state().get("field_1");
            // here `val` is guaranteed to be "value_2" because the `sessionService.appendEvent`
            // called by the Runner would have updated the session state within the `ctx` object.
    
            System.out.println("Resumed execution. Value of field_1 is now: " + val);
    
            // ... subsequent code continues ...
            // If this subsequent code needs to yield another event, it would do so here.
    ```

This cooperative yield/pause/resume cycle between the `Runner` and your Execution Logic, mediated by `Event` objects, forms the core of the ADK Runtime.

## Key components of the Runtime

Several components work together within the ADK Runtime to execute an agent invocation. Understanding their roles clarifies how the event loop functions:

1. ### `Runner`

      * **Role:** The main entry point and orchestrator for a single user query (`run_async`).
      * **Function:** Manages the overall Event Loop, receives events yielded by the Execution Logic, coordinates with Services to process and commit event actions (state/artifact changes), and forwards processed events upstream (e.g., to the UI). It essentially drives the conversation turn by turn based on yielded events. (Defined in `google.adk.runners.runner`).

2. ### Execution Logic Components

      * **Role:** The parts containing your custom code and the core agent capabilities.
      * **Components:**
      * `Agent` (`BaseAgent`, `LlmAgent`, etc.): Your primary logic units that process information and decide on actions. They implement the `_run_async_impl` method which yields events.
      * `Tools` (`BaseTool`, `FunctionTool`, `AgentTool`, etc.): External functions or capabilities used by agents (often `LlmAgent`) to interact with the outside world or perform specific tasks. They execute and return results, which are then wrapped in events.
      * `Callbacks` (Functions): User-defined functions attached to agents (e.g., `before_agent_callback`, `after_model_callback`) that hook into specific points in the execution flow, potentially modifying behavior or state, whose effects are captured in events.
      * **Function:** Perform the actual thinking, calculation, or external interaction. They communicate their results or needs by **yielding `Event` objects** and pausing until the Runner processes them.

3. ### `Event`

      * **Role:** The message passed back and forth between the `Runner` and the Execution Logic.
      * **Function:** Represents an atomic occurrence (user input, agent text, tool call/result, state change request, control signal). It carries both the content of the occurrence and the intended side effects (`actions` like `state_delta`).

4. ### `Services`

      * **Role:** Backend components responsible for managing persistent or shared resources. Used primarily by the `Runner` during event processing.
      * **Components:**
      * `SessionService` (`BaseSessionService`, `InMemorySessionService`, etc.): Manages `Session` objects, including saving/loading them, applying `state_delta` to the session state, and appending events to the `event history`.
      * `ArtifactService` (`BaseArtifactService`, `InMemoryArtifactService`, `GcsArtifactService`, etc.): Manages the storage and retrieval of binary artifact data. Although `save_artifact` is called via context during execution logic, the `artifact_delta` in the event confirms the action for the Runner/SessionService.
      * `MemoryService` (`BaseMemoryService`, etc.): (Optional) Manages long-term semantic memory across sessions for a user.
      * **Function:** Provide the persistence layer. The `Runner` interacts with them to ensure changes signaled by `event.actions` are reliably stored *before* the Execution Logic resumes.

5. ### `Session`

      * **Role:** A data container holding the state and history for *one specific conversation* between a user and the application.
      * **Function:** Stores the current `state` dictionary, the list of all past `events` (`event history`), and references to associated artifacts. It's the primary record of the interaction, managed by the `SessionService`.

6. ### `Invocation`

      * **Role:** A conceptual term representing everything that happens in response to a *single* user query, from the moment the `Runner` receives it until the agent logic finishes yielding events for that query.
      * **Function:** An invocation might involve multiple agent runs (if using agent transfer or `AgentTool`), multiple LLM calls, tool executions, and callback executions, all tied together by a single `invocation_id` within the `InvocationContext`.

These players interact continuously through the Event Loop to process a user's request.

## How It Works: A Simplified Invocation

Let's trace a simplified flow for a typical user query that involves an LLM agent calling a tool:

![intro_components.png](../assets/invocation-flow.png)

### Step-by-Step Breakdown

1. **User Input:** The User sends a query (e.g., "What's the capital of France?").
2. **Runner Starts:** `Runner.run_async` begins. It interacts with the `SessionService` to load the relevant `Session` and adds the user query as the first `Event` to the session history. An `InvocationContext` (`ctx`) is prepared.
3. **Agent Execution:** The `Runner` calls `agent.run_async(ctx)` on the designated root agent (e.g., an `LlmAgent`).
4. **LLM Call (Example):** The `Agent_Llm` determines it needs information, perhaps by calling a tool. It prepares a request for the `LLM`. Let's assume the LLM decides to call `MyTool`.
5. **Yield FunctionCall Event:** The `Agent_Llm` receives the `FunctionCall` response from the LLM, wraps it in an `Event(author='Agent_Llm', content=Content(parts=[Part(function_call=...)]))`, and `yields` or `emits` this event.
6. **Agent Pauses:** The `Agent_Llm`'s execution pauses immediately after the `yield`.
7. **Runner Processes:** The `Runner` receives the FunctionCall event. It passes it to the `SessionService` to record it in the history. The `Runner` then yields the event upstream to the `User` (or application).
8. **Agent Resumes:** The `Runner` signals that the event is processed, and `Agent_Llm` resumes execution.
9. **Tool Execution:** The `Agent_Llm`'s internal flow now proceeds to execute the requested `MyTool`. It calls `tool.run_async(...)`.
10. **Tool Returns Result:** `MyTool` executes and returns its result (e.g., `{'result': 'Paris'}`).
11. **Yield FunctionResponse Event:** The agent (`Agent_Llm`) wraps the tool result into an `Event` containing a `FunctionResponse` part (e.g., `Event(author='Agent_Llm', content=Content(role='user', parts=[Part(function_response=...)]))`). This event might also contain `actions` if the tool modified state (`state_delta`) or saved artifacts (`artifact_delta`). The agent `yield`s this event.
12. **Agent Pauses:** `Agent_Llm` pauses again.
13. **Runner Processes:** `Runner` receives the FunctionResponse event. It passes it to `SessionService` which applies any `state_delta`/`artifact_delta` and adds the event to history. `Runner` yields the event upstream.
14. **Agent Resumes:** `Agent_Llm` resumes, now knowing the tool result and any state changes are committed.
15. **Final LLM Call (Example):** `Agent_Llm` sends the tool result back to the `LLM` to generate a natural language response.
16. **Yield Final Text Event:** `Agent_Llm` receives the final text from the `LLM`, wraps it in an `Event(author='Agent_Llm', content=Content(parts=[Part(text=...)]))`, and `yield`s it.
17. **Agent Pauses:** `Agent_Llm` pauses.
18. **Runner Processes:** `Runner` receives the final text event, passes it to `SessionService` for history, and yields it upstream to the `User`. This is likely marked as the `is_final_response()`.
19. **Agent Resumes & Finishes:** `Agent_Llm` resumes. Having completed its task for this invocation, its `run_async` generator finishes.
20. **Runner Completes:** The `Runner` sees the agent's generator is exhausted and finishes its loop for this invocation.

This yield/pause/process/resume cycle ensures that state changes are consistently applied and that the execution logic always operates on the most recently committed state after yielding an event.

## Important Runtime Behaviors

Understanding a few key aspects of how the ADK Runtime handles state, streaming, and asynchronous operations is crucial for building predictable and efficient agents.

### State Updates & Commitment Timing

* **The Rule:** When your code (in an agent, tool, or callback) modifies the session state (e.g., `context.state['my_key'] = 'new_value'`), this change is initially recorded locally within the current `InvocationContext`. The change is only **guaranteed to be persisted** (saved by the `SessionService`) *after* the `Event` carrying the corresponding `state_delta` in its `actions` has been `yield`\-ed by your code and subsequently processed by the `Runner`.

* **Implication:** Code that runs *after* resuming from a `yield` can reliably assume that the state changes signaled in the *yielded event* have been committed.

=== "Python"

    ```py
    # Inside agent logic (conceptual)
    
    # 1. Modify state
    ctx.session.state['status'] = 'processing'
    event1 = Event(..., actions=EventActions(state_delta={'status': 'processing'}))
    
    # 2. Yield event with the delta
    yield event1
    # --- PAUSE --- Runner processes event1, SessionService commits 'status' = 'processing' ---
    
    # 3. Resume execution
    # Now it's safe to rely on the committed state
    current_status = ctx.session.state['status'] # Guaranteed to be 'processing'
    print(f"Status after resuming: {current_status}")
    ```

=== "Java"

    ```java
    // Inside agent logic (conceptual)
    // ... previous code runs based on current state ...
    
    // 1. Prepare state modification and construct the event
    ConcurrentHashMap<String, Object> stateChanges = new ConcurrentHashMap<>();
    stateChanges.put("status", "processing");
    
    EventActions actions = EventActions.builder().stateDelta(stateChanges).build();
    Content content = Content.builder().parts(Part.fromText("Status update: processing")).build();
    
    Event event1 = Event.builder()
        .actions(actions)
        // ...
        .build();
    
    // 2. Yield event with the delta
    return Flowable.just(event1)
        .map(
            emittedEvent -> {
                // --- CONCEPTUAL PAUSE & RUNNER PROCESSING ---
                // 3. Resume execution (conceptually)
                // Now it's safe to rely on the committed state.
                String currentStatus = (String) ctx.session().state().get("status");
                System.out.println("Status after resuming (inside agent logic): " + currentStatus); // Guaranteed to be 'processing'
    
                // The event itself (event1) is passed on.
                // If subsequent logic within this agent step produced *another* event,
                // you'd use concatMap to emit that new event.
                return emittedEvent;
            });
    
    // ... subsequent agent logic might involve further reactive operators
    // or emitting more events based on the now-updated `ctx.session().state()`.
    ```

### "Dirty Reads" of Session State

* **Definition:** While commitment happens *after* the yield, code running *later within the same invocation*, but *before* the state-changing event is actually yielded and processed, **can often see the local, uncommitted changes**. This is sometimes called a "dirty read".
* **Example:**

=== "Python"

    ```py
    # Code in before_agent_callback
    callback_context.state['field_1'] = 'value_1'
    # State is locally set to 'value_1', but not yet committed by Runner
    
    # ... agent runs ...
    
    # Code in a tool called later *within the same invocation*
    # Readable (dirty read), but 'value_1' isn't guaranteed persistent yet.
    val = tool_context.state['field_1'] # 'val' will likely be 'value_1' here
    print(f"Dirty read value in tool: {val}")
    
    # Assume the event carrying the state_delta={'field_1': 'value_1'}
    # is yielded *after* this tool runs and is processed by the Runner.
    ```

=== "Java"

    ```java
    // Modify state - Code in BeforeAgentCallback
    // AND stages this change in callbackContext.eventActions().stateDelta().
    callbackContext.state().put("field_1", "value_1");

    // --- agent runs ... ---

    // --- Code in a tool called later *within the same invocation* ---
    // Readable (dirty read), but 'value_1' isn't guaranteed persistent yet.
    Object val = toolContext.state().get("field_1"); // 'val' will likely be 'value_1' here
    System.out.println("Dirty read value in tool: " + val);
    // Assume the event carrying the state_delta={'field_1': 'value_1'}
    // is yielded *after* this tool runs and is processed by the Runner.
    ```

* **Implications:**
  * **Benefit:** Allows different parts of your logic within a single complex step (e.g., multiple callbacks or tool calls before the next LLM turn) to coordinate using state without waiting for a full yield/commit cycle.
  * **Caveat:** Relying heavily on dirty reads for critical logic can be risky. If the invocation fails *before* the event carrying the `state_delta` is yielded and processed by the `Runner`, the uncommitted state change will be lost. For critical state transitions, ensure they are associated with an event that gets successfully processed.

### Streaming vs. Non-Streaming Output (`partial=True`)

This primarily relates to how responses from the LLM are handled, especially when using streaming generation APIs.

* **Streaming:** The LLM generates its response token-by-token or in small chunks.
  * The framework (often within `BaseLlmFlow`) yields multiple `Event` objects for a single conceptual response. Most of these events will have `partial=True`.
  * The `Runner`, upon receiving an event with `partial=True`, typically **forwards it immediately** upstream (for UI display) but **skips processing its `actions`** (like `state_delta`).
  * Eventually, the framework yields a final event for that response, marked as non-partial (`partial=False` or implicitly via `turn_complete=True`).
  * The `Runner` **fully processes only this final event**, committing any associated `state_delta` or `artifact_delta`.
* **Non-Streaming:** The LLM generates the entire response at once. The framework yields a single event marked as non-partial, which the `Runner` processes fully.
* **Why it Matters:** Ensures that state changes are applied atomically and only once based on the *complete* response from the LLM, while still allowing the UI to display text progressively as it's generated.

## Async is Primary (`run_async`)

* **Core Design:** The ADK Runtime is fundamentally built on asynchronous libraries (like Python's `asyncio` and Java's `RxJava`) to handle concurrent operations (like waiting for LLM responses or tool executions) efficiently without blocking.
* **Main Entry Point:** `Runner.run_async` is the primary method for executing agent invocations. All core runnable components (Agents, specific flows) use `asynchronous` methods internally.
* **Synchronous Convenience (`run`):** A synchronous `Runner.run` method exists mainly for convenience (e.g., in simple scripts or testing environments). However, internally, `Runner.run` typically just calls `Runner.run_async` and manages the async event loop execution for you.
* **Developer Experience:** We recommend designing your applications (e.g., web servers using ADK) to be asynchronous for best performance. In Python, this means using `asyncio`; in Java, leverage `RxJava`'s reactive programming model.
* **Sync Callbacks/Tools:** The ADK framework supports both asynchronous and synchronous functions for tools and callbacks.
    * **Blocking I/O:** For long-running synchronous I/O operations, the framework attempts to prevent stalls. Python ADK may use asyncio.to_thread, while Java ADK often relies on appropriate RxJava schedulers or wrappers for blocking calls.
    * **CPU-Bound Work:** Purely CPU-intensive synchronous tasks will still block their execution thread in both environments.

Understanding these behaviors helps you write more robust ADK applications and debug issues related to state consistency, streaming updates, and asynchronous execution.



================================================
FILE: docs/runtime/runconfig.md
================================================
# Runtime Configuration

`RunConfig` defines runtime behavior and options for agents in the ADK. It
controls speech and streaming settings, function calling, artifact saving, and
limits on LLM calls.

When constructing an agent run, you can pass a `RunConfig` to customize how the
agent interacts with models, handles audio, and streams responses. By default,
no streaming is enabled and inputs aren’t retained as artifacts. Use `RunConfig`
to override these defaults.

## Class Definition

The `RunConfig` class holds configuration parameters for an agent's runtime behavior.

- Python ADK uses Pydantic for this validation.

- Java ADK typically uses immutable data classes.

=== "Python"

    ```python
    class RunConfig(BaseModel):
        """Configs for runtime behavior of agents."""
    
        model_config = ConfigDict(
            extra='forbid',
        )
    
        speech_config: Optional[types.SpeechConfig] = None
        response_modalities: Optional[list[str]] = None
        save_input_blobs_as_artifacts: bool = False
        support_cfc: bool = False
        streaming_mode: StreamingMode = StreamingMode.NONE
        output_audio_transcription: Optional[types.AudioTranscriptionConfig] = None
        max_llm_calls: int = 500
    ```

=== "Java"

    ```java
    public abstract class RunConfig {
      
      public enum StreamingMode {
        NONE,
        SSE,
        BIDI
      }
      
      public abstract @Nullable SpeechConfig speechConfig();
    
      public abstract ImmutableList<Modality> responseModalities();
    
      public abstract boolean saveInputBlobsAsArtifacts();
      
      public abstract @Nullable AudioTranscriptionConfig outputAudioTranscription();
    
      public abstract int maxLlmCalls();
      
      // ...
    }
    ```

## Runtime Parameters

| Parameter                       | Python Type                                  | Java Type                                             | Default (Py / Java)               | Description                                                                                                                  |
| :------------------------------ | :------------------------------------------- |:------------------------------------------------------|:----------------------------------|:-----------------------------------------------------------------------------------------------------------------------------|
| `speech_config`                 | `Optional[types.SpeechConfig]`               | `SpeechConfig` (nullable via `@Nullable`)             | `None` / `null`                   | Configures speech synthesis (voice, language) using the `SpeechConfig` type.                                                 |
| `response_modalities`           | `Optional[list[str]]`                        | `ImmutableList<Modality>`                             | `None` / Empty `ImmutableList`    | List of desired output modalities (e.g., Python: `["TEXT", "AUDIO"]`; Java: uses structured `Modality` objects).             |
| `save_input_blobs_as_artifacts` | `bool`                                       | `boolean`                                             | `False` / `false`                 | If `true`, saves input blobs (e.g., uploaded files) as run artifacts for debugging/auditing.                                 |
| `streaming_mode`                | `StreamingMode`                              | *Currently not supported*                             | `StreamingMode.NONE` / N/A        | Sets the streaming behavior: `NONE` (default), `SSE` (server-sent events), or `BIDI` (bidirectional).                        |
| `output_audio_transcription`    | `Optional[types.AudioTranscriptionConfig]`   | `AudioTranscriptionConfig` (nullable via `@Nullable`) | `None` / `null`                   | Configures transcription of generated audio output using the `AudioTranscriptionConfig` type.                                |
| `max_llm_calls`                 | `int`                                        | `int`                                                 | `500` / `500`                     | Limits total LLM calls per run. `0` or negative means unlimited (warned); `sys.maxsize` raises `ValueError`.                 |
| `support_cfc`                   | `bool`                                       | *Currently not supported*                             | `False` / N/A                     | **Python:** Enables Compositional Function Calling. Requires `streaming_mode=SSE` and uses the LIVE API. **Experimental.**   |

### `speech_config`

!!! Note
    The interface or definition of `SpeechConfig` is the same, irrespective of the language.

Speech configuration settings for live agents with audio capabilities. The
`SpeechConfig` class has the following structure:

```python
class SpeechConfig(_common.BaseModel):
    """The speech generation configuration."""

    voice_config: Optional[VoiceConfig] = Field(
        default=None,
        description="""The configuration for the speaker to use.""",
    )
    language_code: Optional[str] = Field(
        default=None,
        description="""Language code (ISO 639. e.g. en-US) for the speech synthesization.
        Only available for Live API.""",
    )
```

The `voice_config` parameter uses the `VoiceConfig` class:

```python
class VoiceConfig(_common.BaseModel):
    """The configuration for the voice to use."""

    prebuilt_voice_config: Optional[PrebuiltVoiceConfig] = Field(
        default=None,
        description="""The configuration for the speaker to use.""",
    )
```

And `PrebuiltVoiceConfig` has the following structure:

```python
class PrebuiltVoiceConfig(_common.BaseModel):
    """The configuration for the prebuilt speaker to use."""

    voice_name: Optional[str] = Field(
        default=None,
        description="""The name of the prebuilt voice to use.""",
    )
```

These nested configuration classes allow you to specify:

* `voice_config`: The name of the prebuilt voice to use (in the `PrebuiltVoiceConfig`)
* `language_code`: ISO 639 language code (e.g., "en-US") for speech synthesis

When implementing voice-enabled agents, configure these parameters to control
how your agent sounds when speaking.

### `response_modalities`

Defines the output modalities for the agent. If not set, defaults to AUDIO.
Response modalities determine how the agent communicates with users through
various channels (e.g., text, audio).

### `save_input_blobs_as_artifacts`

When enabled, input blobs will be saved as artifacts during agent execution.
This is useful for debugging and audit purposes, allowing developers to review
the exact data received by agents.

### `support_cfc`

Enables Compositional Function Calling (CFC) support. Only applicable when using
StreamingMode.SSE. When enabled, the LIVE API will be invoked as only it
supports CFC functionality.

!!! warning

    The `support_cfc` feature is experimental and its API or behavior might
    change in future releases.

### `streaming_mode`

Configures the streaming behavior of the agent. Possible values:

* `StreamingMode.NONE`: No streaming; responses delivered as complete units
* `StreamingMode.SSE`: Server-Sent Events streaming; one-way streaming from server to client
* `StreamingMode.BIDI`: Bidirectional streaming; simultaneous communication in both directions

Streaming modes affect both performance and user experience. SSE streaming lets users see partial responses as they're generated, while BIDI streaming enables real-time interactive experiences.

### `output_audio_transcription`

Configuration for transcribing audio outputs from live agents with audio
response capability. This enables automatic transcription of audio responses for
accessibility, record-keeping, and multi-modal applications.

### `max_llm_calls`

Sets a limit on the total number of LLM calls for a given agent run.

* Values greater than 0 and less than `sys.maxsize`: Enforces a bound on LLM calls
* Values less than or equal to 0: Allows unbounded LLM calls *(not recommended for production)*

This parameter prevents excessive API usage and potential runaway processes.
Since LLM calls often incur costs and consume resources, setting appropriate
limits is crucial.

## Validation Rules

The `RunConfig` class validates its parameters to ensure proper agent operation. While Python ADK uses `Pydantic` for automatic type validation, Java ADK relies on its static typing and may include explicit checks in the RunConfig's construction.
For the `max_llm_calls` parameter specifically:

1. Extremely large values (like `sys.maxsize` in Python or `Integer.MAX_VALUE` in Java) are typically disallowed to prevent issues.

2. Values of zero or less will usually trigger a warning about unlimited LLM interactions.

## Examples

### Basic runtime configuration

=== "Python"

    ```python
    from google.genai.adk import RunConfig, StreamingMode
    
    config = RunConfig(
        streaming_mode=StreamingMode.NONE,
        max_llm_calls=100
    )
    ```

=== "Java"

    ```java
    import com.google.adk.agents.RunConfig;
    import com.google.adk.agents.RunConfig.StreamingMode;
    
    RunConfig config = RunConfig.builder()
            .setStreamingMode(StreamingMode.NONE)
            .setMaxLlmCalls(100)
            .build();
    ```

This configuration creates a non-streaming agent with a limit of 100 LLM calls,
suitable for simple task-oriented agents where complete responses are
preferable.

### Enabling streaming

=== "Python"

    ```python
    from google.genai.adk import RunConfig, StreamingMode
    
    config = RunConfig(
        streaming_mode=StreamingMode.SSE,
        max_llm_calls=200
    )
    ```

=== "Java"

    ```java
    import com.google.adk.agents.RunConfig;
    import com.google.adk.agents.RunConfig.StreamingMode;
    
    RunConfig config = RunConfig.builder()
        .setStreamingMode(StreamingMode.SSE)
        .setMaxLlmCalls(200)
        .build();
    ```

Using SSE streaming allows users to see responses as they're generated,
providing a more responsive feel for chatbots and assistants.

### Enabling speech support

=== "Python"

    ```python
    from google.genai.adk import RunConfig, StreamingMode
    from google.genai import types
    
    config = RunConfig(
        speech_config=types.SpeechConfig(
            language_code="en-US",
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                    voice_name="Kore"
                )
            ),
        ),
        response_modalities=["AUDIO", "TEXT"],
        save_input_blobs_as_artifacts=True,
        support_cfc=True,
        streaming_mode=StreamingMode.SSE,
        max_llm_calls=1000,
    )
    ```

=== "Java"

    ```java
    import com.google.adk.agents.RunConfig;
    import com.google.adk.agents.RunConfig.StreamingMode;
    import com.google.common.collect.ImmutableList;
    import com.google.genai.types.Content;
    import com.google.genai.types.Modality;
    import com.google.genai.types.Part;
    import com.google.genai.types.PrebuiltVoiceConfig;
    import com.google.genai.types.SpeechConfig;
    import com.google.genai.types.VoiceConfig;
    
    RunConfig runConfig =
        RunConfig.builder()
            .setStreamingMode(StreamingMode.SSE)
            .setMaxLlmCalls(1000)
            .setSaveInputBlobsAsArtifacts(true)
            .setResponseModalities(ImmutableList.of(new Modality("AUDIO"), new Modality("TEXT")))
            .setSpeechConfig(
                SpeechConfig.builder()
                    .voiceConfig(
                        VoiceConfig.builder()
                            .prebuiltVoiceConfig(
                                PrebuiltVoiceConfig.builder().voiceName("Kore").build())
                            .build())
                    .languageCode("en-US")
                    .build())
            .build();
    ```

This comprehensive example configures an agent with:

* Speech capabilities using the "Kore" voice (US English)
* Both audio and text output modalities
* Artifact saving for input blobs (useful for debugging)
* Experimental CFC support enabled **(Python only)**
* SSE streaming for responsive interaction
* A limit of 1000 LLM calls

### Enabling Experimental CFC Support

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

```python
from google.genai.adk import RunConfig, StreamingMode

config = RunConfig(
    streaming_mode=StreamingMode.SSE,
    support_cfc=True,
    max_llm_calls=150
)
```

Enabling Compositional Function Calling creates an agent that can dynamically
execute functions based on model outputs, powerful for applications requiring
complex workflows.


Directory structure:
└── sessions/
    ├── express-mode.md
    ├── index.md
    ├── memory.md
    ├── session.md
    └── state.md

================================================
FILE: docs/sessions/express-mode.md
================================================
# Vertex AI Express Mode: Using Vertex AI Sessions and Memory for Free

If you are interested in using either the `VertexAiSessionService` or `VertexAiMemoryBankService` but you don't have a Google Cloud Project, you can sign up for Vertex AI Express Mode and get access
for free and try out these services! You can sign up with an eligible ***gmail*** account [here](https://console.cloud.google.com/expressmode). For more details about Vertex AI Express mode, see the [overview page](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview). 
Once you sign up, get an [API key](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview#api-keys) and you can get started using your local ADK agent with Vertex AI Session and Memory services!

!!! info Vertex AI Express mode limitations

    Vertex AI Express Mode has certain limitations in the free tier. Free Express mode projects are only valid for 90 days and only select services are available to be used with limited quota. For example, the number of Agent Engines is restricted to 10 and deployment to Agent Engine is reserved for the paid tier only. To remove the quota restrictions and use all of Vertex AI's services, add a billing account to your Express Mode project.

## Create an Agent Engine

`Session` objects are children of an `AgentEngine`. When using Vertex AI Express Mode, we can create an empty `AgentEngine` parent to manage all of our `Session` and `Memory` objects.
First, ensure that your enviornment variables are set correctly. For example, in Python:

      ```env title="weather_agent/.env"
      GOOGLE_GENAI_USE_VERTEXAI=TRUE
      GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_EXPRESS_MODE_API_KEY_HERE
      ```

Next, we can create our Agent Engine instance. You can use the Gen AI SDK.

=== "GenAI SDK"
    1. Import Gen AI SDK.

        ```
        from google import genai
        ```

    2. Set Vertex AI to be True, then use a POST request to create the Agent Engine
        
        ```
        # Create Agent Engine with GenAI SDK
        client = genai.Client(vertexai = True)._api_client

        response = client.request(
                http_method='POST',
                path=f'reasoningEngines',
                request_dict={"displayName": "YOUR_AGENT_ENGINE_DISPLAY_NAME", "description": "YOUR_AGENT_ENGINE_DESCRIPTION"},
            )
        response
        ```

    3. Replace `YOUR_AGENT_ENGINE_DISPLAY_NAME` and `YOUR_AGENT_ENGINE_DESCRIPTION` with your use case.
    4. Get the Agent Engine name and ID from the response

        ```
        APP_NAME="/".join(response['name'].split("/")[:6])
        APP_ID=APP_NAME.split('/')[-1]
        ```

## Managing Sessions with a `VertexAiSessionService`

[VertexAiSessionService](session.md###sessionservice-implementations) is compatible with Vertex AI Express mode API Keys. We can 
instead initialize the session object without any project or location.

       ```py
       # Requires: pip install google-adk[vertexai]
       # Plus environment variable setup:
       # GOOGLE_GENAI_USE_VERTEXAI=TRUE
       # GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_EXPRESS_MODE_API_KEY_HERE
       from google.adk.sessions import VertexAiSessionService

       # The app_name used with this service should be the Reasoning Engine ID or name
       APP_ID = "your-reasoning-engine-id"

       # Project and location are not required when initializing with Vertex Express Mode
       session_service = VertexAiSessionService(agent_engine_id=APP_ID)
       # Use REASONING_ENGINE_APP_ID when calling service methods, e.g.:
       # session = await session_service.create_session(app_name=REASONING_ENGINE_APP_ID, user_id= ...)
       ```
!!! info Session Service Quotas

    For Free Express Mode Projects, `VertexAiSessionService` has the following quota:

    - 100 Session Entities
    - 10,000 Event Entities

## Managing Memories with a `VertexAiMemoryBankService`

[VertexAiMemoryBankService](memory.md###memoryservice-implementations) is compatible with Vertex AI Express mode API Keys. We can 
instead initialize the memory object without any project or location.

       ```py
       # Requires: pip install google-adk[vertexai]
       # Plus environment variable setup:
       # GOOGLE_GENAI_USE_VERTEXAI=TRUE
       # GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_EXPRESS_MODE_API_KEY_HERE
       from google.adk.sessions import VertexAiMemoryBankService

       # The app_name used with this service should be the Reasoning Engine ID or name
       APP_ID = "your-reasoning-engine-id"

       # Project and location are not required when initializing with Vertex Express Mode
       memory_service = VertexAiMemoryBankService(agent_engine_id=APP_ID)
       # Generate a memory from that session so the Agent can remember relevant details about the user
       # memory = await memory_service.add_session_to_memory(session)
       ```
!!! info Memory Service Quotas

    For Free Express Mode Projects, `VertexAiMemoryBankService` has the following quota:

    - 200 Memory Entities

## Code Sample: Weather Agent with Session and Memory using Vertex AI Express Mode

In this sample, we create a weather agent that utilizes both `VertexAiSessionService` and `VertexAiMemoryBankService` for context maangement, allowing our agent to recall user prefereneces and conversations!

**[Weather Agent with Session and Memory using Vertex AI Express Mode](https://github.com/google/adk-docs/blob/main/examples/python/notebooks/express-mode-weather-agent.ipynb)**



================================================
FILE: docs/sessions/index.md
================================================
# Introduction to Conversational Context: Session, State, and Memory

## Why Context Matters

Meaningful, multi-turn conversations require agents to understand context. Just
like humans, they need to recall the conversation history: what's been said and
done to maintain continuity and avoid repetition. The Agent Development Kit
(ADK) provides structured ways to manage this context through `Session`,
`State`, and `Memory`.

## Core Concepts

Think of different instances of your conversations with the agent as distinct
**conversation threads**, potentially drawing upon **long-term knowledge**.

1.  **`Session`**: The Current Conversation Thread

    *   Represents a *single, ongoing interaction* between a user and your agent
        system.
    *   Contains the chronological sequence of messages and actions taken by the
        agent (referred to `Events`) during *that specific interaction*.
    *   A `Session` can also hold temporary data (`State`) relevant only *during
        this conversation*.

2.  **`State` (`session.state`)**: Data Within the Current Conversation

    *   Data stored within a specific `Session`.
    *   Used to manage information relevant *only* to the *current, active*
        conversation thread (e.g., items in a shopping cart *during this chat*,
        user preferences mentioned *in this session*).

3.  **`Memory`**: Searchable, Cross-Session Information

    *   Represents a store of information that might span *multiple past
        sessions* or include external data sources.
    *   It acts as a knowledge base the agent can *search* to recall information
        or context beyond the immediate conversation.

## Managing Context: Services

ADK provides services to manage these concepts:

1.  **`SessionService`**: Manages the different conversation threads (`Session`
    objects)

    *   Handles the lifecycle: creating, retrieving, updating (appending
        `Events`, modifying `State`), and deleting individual `Session`s.

2.  **`MemoryService`**: Manages the Long-Term Knowledge Store (`Memory`)

    *   Handles ingesting information (often from completed `Session`s) into the
        long-term store.
    *   Provides methods to search this stored knowledge based on queries.

**Implementations**: ADK offers different implementations for both
`SessionService` and `MemoryService`, allowing you to choose the storage backend
that best fits your application's needs. Notably, **in-memory implementations**
are provided for both services; these are designed specifically for **local
testing and fast development**. It's important to remember that **all data
stored using these in-memory options (sessions, state, or long-term knowledge)
is lost when your application restarts**. For persistence and scalability beyond
local testing, ADK also offers cloud-based and database service options.

**In Summary:**

*   **`Session` & `State`**: Focus on the **current interaction** – the history
    and data of the *single, active conversation*. Managed primarily by a
    `SessionService`.
*   **Memory**: Focuses on the **past and external information** – a *searchable
    archive* potentially spanning across conversations. Managed by a
    `MemoryService`.

## What's Next?

In the following sections, we'll dive deeper into each of these components:

*   **`Session`**: Understanding its structure and `Events`.
*   **`State`**: How to effectively read, write, and manage session-specific
    data.
*   **`SessionService`**: Choosing the right storage backend for your sessions.
*   **`MemoryService`**: Exploring options for storing and retrieving broader
    context.

Understanding these concepts is fundamental to building agents that can engage
in complex, stateful, and context-aware conversations.



================================================
FILE: docs/sessions/memory.md
================================================
# Memory: Long-Term Knowledge with `MemoryService`

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

We've seen how `Session` tracks the history (`events`) and temporary data (`state`) for a *single, ongoing conversation*. But what if an agent needs to recall information from *past* conversations or access external knowledge bases? This is where the concept of **Long-Term Knowledge** and the **`MemoryService`** come into play.

Think of it this way:

* **`Session` / `State`:** Like your short-term memory during one specific chat.  
* **Long-Term Knowledge (`MemoryService`)**: Like a searchable archive or knowledge library the agent can consult, potentially containing information from many past chats or other sources.

## The `MemoryService` Role

The `BaseMemoryService` defines the interface for managing this searchable, long-term knowledge store. Its primary responsibilities are:

1. **Ingesting Information (`add_session_to_memory`):** Taking the contents of a (usually completed) `Session` and adding relevant information to the long-term knowledge store.  
2. **Searching Information (`search_memory`):** Allowing an agent (typically via a `Tool`) to query the knowledge store and retrieve relevant snippets or context based on a search query.

## Choosing the Right Memory Service

The ADK offers two distinct `MemoryService` implementations, each tailored to different use cases. Use the table below to decide which is the best fit for your agent.

| **Feature** | **InMemoryMemoryService** | **[NEW!] VertexAiMemoryBankService** |
| :--- | :--- | :--- |
| **Persistence** | None (data is lost on restart) | Yes (Managed by Vertex AI) |
| **Primary Use Case** | Prototyping, local development, and simple testing. | Building meaningful, evolving memories from user conversations. |
| **Memory Extraction** | Stores full conversation | Extracts [meaningful information](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/memory-bank/generate-memories) from conversations and consolidates it with existing memories (powered by LLM) |
| **Search Capability** | Basic keyword matching. | Advanced semantic search. |
| **Setup Complexity** | None. It's the default. | Low. Requires an [Agent Engine](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/memory-bank/overview) in Vertex AI. |
| **Dependencies** | None. | Google Cloud Project, Vertex AI API |
| **When to use it** | When you want to search across multiple sessions’ chat histories for prototyping. | When you want your agent to remember and learn from past interactions. |

## In-Memory Memory

The `InMemoryMemoryService` stores session information in the application's memory and performs basic keyword matching for searches. It requires no setup and is best for prototyping and simple testing scenarios where persistence isn't required.

```py
from google.adk.memory import InMemoryMemoryService
memory_service = InMemoryMemoryService()
```

**Example: Adding and Searching Memory**

This example demonstrates the basic flow using the `InMemoryMemoryService` for simplicity.

??? "Full Code"

    ```py
    import asyncio
    from google.adk.agents import LlmAgent
    from google.adk.sessions import InMemorySessionService, Session
    from google.adk.memory import InMemoryMemoryService # Import MemoryService
    from google.adk.runners import Runner
    from google.adk.tools import load_memory # Tool to query memory
    from google.genai.types import Content, Part

    # --- Constants ---
    APP_NAME = "memory_example_app"
    USER_ID = "mem_user"
    MODEL = "gemini-2.0-flash" # Use a valid model

    # --- Agent Definitions ---
    # Agent 1: Simple agent to capture information
    info_capture_agent = LlmAgent(
        model=MODEL,
        name="InfoCaptureAgent",
        instruction="Acknowledge the user's statement.",
        # output_key="captured_info" # Could optionally save to state too
    )

    # Agent 2: Agent that can use memory
    memory_recall_agent = LlmAgent(
        model=MODEL,
        name="MemoryRecallAgent",
        instruction="Answer the user's question. Use the 'load_memory' tool "
                    "if the answer might be in past conversations.",
        tools=[load_memory] # Give the agent the tool
    )

    # --- Services and Runner ---
    session_service = InMemorySessionService()
    memory_service = InMemoryMemoryService() # Use in-memory for demo

    runner = Runner(
        # Start with the info capture agent
        agent=info_capture_agent,
        app_name=APP_NAME,
        session_service=session_service,
        memory_service=memory_service # Provide the memory service to the Runner
    )

    # --- Scenario ---

    # Turn 1: Capture some information in a session
    print("--- Turn 1: Capturing Information ---")
    session1_id = "session_info"
    session1 = await runner.session_service.create_session(app_name=APP_NAME, user_id=USER_ID, session_id=session1_id)
    user_input1 = Content(parts=[Part(text="My favorite project is Project Alpha.")], role="user")

    # Run the agent
    final_response_text = "(No final response)"
    async for event in runner.run_async(user_id=USER_ID, session_id=session1_id, new_message=user_input1):
        if event.is_final_response() and event.content and event.content.parts:
            final_response_text = event.content.parts[0].text
    print(f"Agent 1 Response: {final_response_text}")

    # Get the completed session
    completed_session1 = await runner.session_service.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=session1_id)

    # Add this session's content to the Memory Service
    print("\n--- Adding Session 1 to Memory ---")
    memory_service = await memory_service.add_session_to_memory(completed_session1)
    print("Session added to memory.")
    ```

## Vertex AI Memory Bank

The `VertexAiMemoryBankService` connects your agent to [Vertex AI Memory Bank](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/memory-bank/overview), a fully managed Google Cloud service that provides sophisticated, persistent memory capabilities for conversational agents.

### How It Works

The service automatically handles two key operations:

*   **Generating Memories:** At the end of a conversation, the ADK sends the session's events to the Memory Bank, which intelligently processes and stores the information as "memories."
*   **Retrieving Memories:** Your agent code can issue a search query against the Memory Bank to retrieve relevant memories from past conversations.

### Prerequisites

Before you can use this feature, you must have:

1.  **A Google Cloud Project:** With the Vertex AI API enabled.
2.  **An Agent Engine:** You need to create an Agent Engine in Vertex AI. This will provide you with the **Agent Engine ID** required for configuration.
3.  **Authentication:** Ensure your local environment is authenticated to access Google Cloud services. The simplest way is to run:
    ```bash
    gcloud auth application-default login
    ```
4.  **Environment Variables:** The service requires your Google Cloud Project ID and Location. Set them as environment variables:
    ```bash
    export GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
    export GOOGLE_CLOUD_LOCATION="your-gcp-location"
    ```

### Configuration

To connect your agent to the Memory Bank, you use the `--memory_service_uri` flag when starting the ADK server (`adk web` or `adk api_server`). The URI must be in the format `agentengine://<agent_engine_id>`.

```bash title="bash"
adk web path/to/your/agents_dir --memory_service_uri="agentengine://1234567890"
```

Or, you can configure your agent to use the Memory Bank by manually instantiating the `VertexAiMemoryBankService` and passing it to the `Runner`.

```py
from google.adk.memory import VertexAiMemoryBankService

agent_engine_id = agent_engine.api_resource.name.split("/")[-1]

memory_service = VertexAiMemoryBankService(
    project="PROJECT_ID",
    location="LOCATION",
    agent_engine_id=agent_engine_id
)

runner = adk.Runner(
    ...
    memory_service=memory_service
)
``` 

### Using Memory in Your Agent

With the service configured, the ADK automatically saves session data to the Memory Bank. To make your agent use this memory, you need to call the `search_memory` method from your agent's code.

This is typically done at the beginning of a turn to fetch relevant context before generating a response.

**Example:**

```python
from google.adk.agents import Agent
from google.genai import types

class MyAgent(Agent):
    async def run(self, request: types.Content, **kwargs) -> types.Content:
        # Get the user's latest message
        user_query = request.parts[0].text

        # Search the memory for context related to the user's query
        search_result = await self.search_memory(query=user_query)

        # Create a prompt that includes the retrieved memories
        prompt = f"Based on my memory, here's what I recall about your query: {search_result.memories}\n\nNow, please respond to: {user_query}"

        # Call the LLM with the enhanced prompt
        return await self.llm.generate_content_async(prompt)
```

## Advanced Concepts

### How Memory Works in Practice

The memory workflow internally involves these steps:

1. **Session Interaction:** A user interacts with an agent via a `Session`, managed by a `SessionService`. Events are added, and state might be updated.  
2. **Ingestion into Memory:** At some point (often when a session is considered complete or has yielded significant information), your application calls `memory_service.add_session_to_memory(session)`. This extracts relevant information from the session's events and adds it to the long-term knowledge store (in-memory dictionary or RAG Corpus).  
3. **Later Query:** In a *different* (or the same) session, the user might ask a question requiring past context (e.g., "What did we discuss about project X last week?").  
4. **Agent Uses Memory Tool:** An agent equipped with a memory-retrieval tool (like the built-in `load_memory` tool) recognizes the need for past context. It calls the tool, providing a search query (e.g., "discussion project X last week").  
5. **Search Execution:** The tool internally calls `memory_service.search_memory(app_name, user_id, query)`.  
6. **Results Returned:** The `MemoryService` searches its store (using keyword matching or semantic search) and returns relevant snippets as a `SearchMemoryResponse` containing a list of `MemoryResult` objects (each potentially holding events from a relevant past session).  
7. **Agent Uses Results:** The tool returns these results to the agent, usually as part of the context or function response. The agent can then use this retrieved information to formulate its final answer to the user.

### Can an agent have access to more than one memory service?

*   **Through Standard Configuration: No.** The framework (`adk web`, `adk api_server`) is designed to be configured with one single memory service at a time via the `--memory_service_uri` flag. This single service is then provided to the agent and accessed through the built-in `self.search_memory()` method. From a configuration standpoint, you can only choose one backend (`InMemory`, `VertexAiMemoryBankService`) for all agents served by that process.

*   **Within Your Agent's Code: Yes, absolutely.** There is nothing preventing you from manually importing and instantiating another memory service directly inside your agent's code. This allows you to access multiple memory sources within a single agent turn.

For example, your agent could use the framework-configured `VertexAiMemoryBankService` to recall conversational history, and also manually instantiate a `InMemoryMemoryService` to look up information in a technical manual.

#### Example: Using Two Memory Services

Here’s how you could implement that in your agent's code:

```python
from google.adk.agents import Agent
from google.adk.memory import InMemoryMemoryService, VertexAiMemoryBankService
from google.genai import types

class MultiMemoryAgent(Agent):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.memory_service = InMemoryMemoryService()
        # Manually instantiate a second memory service for document lookups
        self.vertexai_memorybank_service = VertexAiMemoryBankService(
            project="PROJECT_ID",
            location="LOCATION",
            agent_engine_id="AGENT_ENGINE_ID"
        )

    async def run(self, request: types.Content, **kwargs) -> types.Content:
        user_query = request.parts[0].text

        # 1. Search conversational history using the framework-provided memory
        #    (This would be InMemoryMemoryService if configured)
        conversation_context = await self.search_memory(query=user_query)

        # 2. Search the document knowledge base using the manually created service
        document_context = await self.vertexai_memorybank_service.search_memory(query=user_query)

        # Combine the context from both sources to generate a better response
        prompt = "From our past conversations, I remember:\n"
        prompt += f"{conversation_context.memories}\n\n"
        prompt += "From the technical manuals, I found:\n"
        prompt += f"{document_context.memories}\n\n"
        prompt += f"Based on all this, here is my answer to '{user_query}':"

        return await self.llm.generate_content_async(prompt)
```



================================================
FILE: docs/sessions/session.md
================================================
# Session: Tracking Individual Conversations

Following our Introduction, let's dive into the `Session`. Think back to the
idea of a "conversation thread." Just like you wouldn't start every text message
from scratch, agents need context regarding the ongoing interaction.
**`Session`** is the ADK object designed specifically to track and manage these
individual conversation threads.

## The `Session` Object

When a user starts interacting with your agent, the `SessionService` creates a
`Session` object (`google.adk.sessions.Session`). This object acts as the
container holding everything related to that *one specific chat thread*. Here
are its key properties:

*   **Identification (`id`, `appName`, `userId`):** Unique labels for the
    conversation.
    * `id`: A unique identifier for *this specific* conversation thread, essential for retrieving it later. A SessionService object can handle multiple `Session`(s). This field identifies which particular session object are we referring to. For example, "test_id_modification".
    * `app_name`: Identifies which agent application this conversation belongs to. For example, "id_modifier_workflow". 
    *   `userId`: Links the conversation to a particular user.
*   **History (`events`):** A chronological sequence of all interactions
    (`Event` objects – user messages, agent responses, tool actions) that have
    occurred within this specific thread.
*   **Session State (`state`):** A place to store temporary data relevant *only*
    to this specific, ongoing conversation. This acts as a scratchpad for the
    agent during the interaction. We will cover how to use and manage `state` in
    detail in the next section.
*   **Activity Tracking (`lastUpdateTime`):** A timestamp indicating the last
    time an event occurred in this conversation thread.

### Example: Examining Session Properties


=== "Python"

       ```py
        from google.adk.sessions import InMemorySessionService, Session
    
        # Create a simple session to examine its properties
        temp_service = InMemorySessionService()
        example_session = await temp_service.create_session(
            app_name="my_app",
            user_id="example_user",
            state={"initial_key": "initial_value"} # State can be initialized
        )

        print(f"--- Examining Session Properties ---")
        print(f"ID (`id`):                {example_session.id}")
        print(f"Application Name (`app_name`): {example_session.app_name}")
        print(f"User ID (`user_id`):         {example_session.user_id}")
        print(f"State (`state`):           {example_session.state}") # Note: Only shows initial state here
        print(f"Events (`events`):         {example_session.events}") # Initially empty
        print(f"Last Update (`last_update_time`): {example_session.last_update_time:.2f}")
        print(f"---------------------------------")

        # Clean up (optional for this example)
        temp_service = await temp_service.delete_session(app_name=example_session.app_name,
                                    user_id=example_session.user_id, session_id=example_session.id)
        print("The final status of temp_service - ", temp_service)
       ```

=== "Java"

       ```java
        import com.google.adk.sessions.InMemorySessionService;
        import com.google.adk.sessions.Session;
        import java.util.concurrent.ConcurrentMap;
        import java.util.concurrent.ConcurrentHashMap;
    
        String sessionId = "123";
        String appName = "example-app"; // Example app name
        String userId = "example-user"; // Example user id
        ConcurrentMap<String, Object> initialState = new ConcurrentHashMap<>(Map.of("newKey", "newValue"));
        InMemorySessionService exampleSessionService = new InMemorySessionService();
    
        // Create Session
        Session exampleSession = exampleSessionService.createSession(
            appName, userId, initialState, Optional.of(sessionId)).blockingGet();
        System.out.println("Session created successfully.");
    
        System.out.println("--- Examining Session Properties ---");
        System.out.printf("ID (`id`): %s%n", exampleSession.id());
        System.out.printf("Application Name (`appName`): %s%n", exampleSession.appName());
        System.out.printf("User ID (`userId`): %s%n", exampleSession.userId());
        System.out.printf("State (`state`): %s%n", exampleSession.state());
        System.out.println("------------------------------------");
    
    
        // Clean up (optional for this example)
        var unused = exampleSessionService.deleteSession(appName, userId, sessionId);
       ```

*(**Note:** The state shown above is only the initial state. State updates
happen via events, as discussed in the State section.)*

## Managing Sessions with a `SessionService`

As seen above, you don't typically create or manage `Session` objects directly.
Instead, you use a **`SessionService`**. This service acts as the central
manager responsible for the entire lifecycle of your conversation sessions.

Its core responsibilities include:

*   **Starting New Conversations:** Creating fresh `Session` objects when a user
    begins an interaction.
*   **Resuming Existing Conversations:** Retrieving a specific `Session` (using
    its ID) so the agent can continue where it left off.
*   **Saving Progress:** Appending new interactions (`Event` objects) to a
    session's history. This is also the mechanism through which session `state`
    gets updated (more in the `State` section).
*   **Listing Conversations:** Finding the active session threads for a
    particular user and application.
*   **Cleaning Up:** Deleting `Session` objects and their associated data when
    conversations are finished or no longer needed.

## `SessionService` Implementations

ADK provides different `SessionService` implementations, allowing you to choose
the storage backend that best suits your needs:

1.  **`InMemorySessionService`**

    *   **How it works:** Stores all session data directly in the application's
        memory.
    *   **Persistence:** None. **All conversation data is lost if the
        application restarts.**
    *   **Requires:** Nothing extra.
    *   **Best for:** Quick development, local testing, examples, and scenarios
        where long-term persistence isn't required.

    === "Python"
    
           ```py
            from google.adk.sessions import InMemorySessionService
            session_service = InMemorySessionService()
           ```
    === "Java"
    
           ```java
            import com.google.adk.sessions.InMemorySessionService;
            InMemorySessionService exampleSessionService = new InMemorySessionService();
           ```

2.  **`VertexAiSessionService`**

    *   **How it works:** Uses Google Cloud's Vertex AI infrastructure via API
        calls for session management.
    *   **Persistence:** Yes. Data is managed reliably and scalably via
        [Vertex AI Agent Engine](https://google.github.io/adk-docs/deploy/agent-engine/).
    *   **Requires:**
        *   A Google Cloud project (`pip install vertexai`)
        *   A Google Cloud storage bucket that can be configured by this
            [step](https://cloud.google.com/vertex-ai/docs/pipelines/configure-project#storage).
        *   A Reasoning Engine resource name/ID that can setup following this
            [tutorial](https://google.github.io/adk-docs/deploy/agent-engine/).
        *   If you do not have a Google Cloud project and you want to try the VertexAiSessionService for free, see how to [try Session and Memory for free.](express-mode.md)
    *   **Best for:** Scalable production applications deployed on Google Cloud,
        especially when integrating with other Vertex AI features.

    === "Python"
    
           ```py
           # Requires: pip install google-adk[vertexai]
           # Plus GCP setup and authentication
           from google.adk.sessions import VertexAiSessionService

           PROJECT_ID = "your-gcp-project-id"
           LOCATION = "us-central1"
           # The app_name used with this service should be the Reasoning Engine ID or name
           REASONING_ENGINE_APP_NAME = "projects/your-gcp-project-id/locations/us-central1/reasoningEngines/your-engine-id"

           session_service = VertexAiSessionService(project=PROJECT_ID, location=LOCATION)
           # Use REASONING_ENGINE_APP_NAME when calling service methods, e.g.:
           # session_service = await session_service.create_session(app_name=REASONING_ENGINE_APP_NAME, ...)
           ```
       
    === "Java"
    
           ```java
           // Please look at the set of requirements above, consequently export the following in your bashrc file:
           // export GOOGLE_CLOUD_PROJECT=my_gcp_project
           // export GOOGLE_CLOUD_LOCATION=us-central1
           // export GOOGLE_API_KEY=my_api_key

           import com.google.adk.sessions.VertexAiSessionService;
           import java.util.UUID;

           String sessionId = UUID.randomUUID().toString();
           String reasoningEngineAppName = "123456789";
           String userId = "u_123"; // Example user id
           ConcurrentMap<String, Object> initialState = new
               ConcurrentHashMap<>(); // No initial state needed for this example

           VertexAiSessionService sessionService = new VertexAiSessionService();
           Session mySession =
               sessionService
                   .createSession(reasoningEngineAppName, userId, initialState, Optional.of(sessionId))
                   .blockingGet();
           ```

3.  **`DatabaseSessionService`**

    ![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

    *   **How it works:** Connects to a relational database (e.g., PostgreSQL,
        MySQL, SQLite) to store session data persistently in tables.
    *   **Persistence:** Yes. Data survives application restarts.
    *   **Requires:** A configured database.
    *   **Best for:** Applications needing reliable, persistent storage that you
        manage yourself.

    ```py
    from google.adk.sessions import DatabaseSessionService
    # Example using a local SQLite file:
    db_url = "sqlite:///./my_agent_data.db"
    session_service = DatabaseSessionService(db_url=db_url)
    ```

Choosing the right `SessionService` is key to defining how your agent's
conversation history and temporary data are stored and persist.

## The Session Lifecycle

<img src="../../assets/session_lifecycle.png" alt="Session lifecycle">

Here’s a simplified flow of how `Session` and `SessionService` work together
during a conversation turn:

1.  **Start or Resume:** Your application's `Runner` uses the `SessionService`
    to either `create_session` (for a new chat) or `get_session` (to retrieve an
    existing one).
2.  **Context Provided:** The `Runner` gets the appropriate `Session` object
    from the appropriate service method, providing the agent with access to the
    corresponding Session's `state` and `events`.
3.  **Agent Processing:** The user prompts the agent with a query. The agent
    analyzes the query and potentially the session `state` and `events` history
    to determine the response.
4.  **Response & State Update:** The agent generates a response (and potentially
    flags data to be updated in the `state`). The `Runner` packages this as an
    `Event`.
5.  **Save Interaction:** The `Runner` calls
    `sessionService.append_event(session, event)` with the `session` and the new
    `event` as the arguments. The service adds the `Event` to the history and
    updates the session's `state` in storage based on information within the
    event. The session's `last_update_time` also get updated.
6.  **Ready for Next:** The agent's response goes to the user. The updated
    `Session` is now stored by the `SessionService`, ready for the next turn
    (which restarts the cycle at step 1, usually with the continuation of the
    conversation in the current session).
7.  **End Conversation:** When the conversation is over, your application calls
    `sessionService.delete_session(...)` to clean up the stored session data if
    it is no longer required.

This cycle highlights how the `SessionService` ensures conversational continuity
by managing the history and state associated with each `Session` object.



================================================
FILE: docs/sessions/state.md
================================================
# State: The Session's Scratchpad

Within each `Session` (our conversation thread), the **`state`** attribute acts like the agent's dedicated scratchpad for that specific interaction. While `session.events` holds the full history, `session.state` is where the agent stores and updates dynamic details needed *during* the conversation.

## What is `session.state`?

Conceptually, `session.state` is a collection (dictionary or Map) holding key-value pairs. It's designed for information the agent needs to recall or track to make the current conversation effective:

* **Personalize Interaction:** Remember user preferences mentioned earlier (e.g., `'user_preference_theme': 'dark'`).
* **Track Task Progress:** Keep tabs on steps in a multi-turn process (e.g., `'booking_step': 'confirm_payment'`).
* **Accumulate Information:** Build lists or summaries (e.g., `'shopping_cart_items': ['book', 'pen']`).
* **Make Informed Decisions:** Store flags or values influencing the next response (e.g., `'user_is_authenticated': True`).

### Key Characteristics of `State`

1. **Structure: Serializable Key-Value Pairs**

    * Data is stored as `key: value`.
    * **Keys:** Always strings (`str`). Use clear names (e.g., `'departure_city'`, `'user:language_preference'`).
    * **Values:** Must be **serializable**. This means they can be easily saved and loaded by the `SessionService`. Stick to basic types in the specific languages (Python/ Java) like strings, numbers, booleans, and simple lists or dictionaries containing *only* these basic types. (See API documentation for precise details).
    * **⚠️ Avoid Complex Objects:** **Do not store non-serializable objects** (custom class instances, functions, connections, etc.) directly in the state. Store simple identifiers if needed, and retrieve the complex object elsewhere.

2. **Mutability: It Changes**

    * The contents of the `state` are expected to change as the conversation evolves.

3. **Persistence: Depends on `SessionService`**

    * Whether state survives application restarts depends on your chosen service:
      * `InMemorySessionService`: **Not Persistent.** State is lost on restart.
      * `DatabaseSessionService` / `VertexAiSessionService`: **Persistent.** State is saved reliably.

!!! Note
    The specific parameters or method names for the primitives may vary slightly by SDK language (e.g., `session.state['current_intent'] = 'book_flight'` in Python, `session.state().put("current_intent", "book_flight)` in Java). Refer to the language-specific API documentation for details.

### Organizing State with Prefixes: Scope Matters

Prefixes on state keys define their scope and persistence behavior, especially with persistent services:

* **No Prefix (Session State):**

    * **Scope:** Specific to the *current* session (`id`).
    * **Persistence:** Only persists if the `SessionService` is persistent (`Database`, `VertexAI`).
    * **Use Cases:** Tracking progress within the current task (e.g., `'current_booking_step'`), temporary flags for this interaction (e.g., `'needs_clarification'`).
    * **Example:** `session.state['current_intent'] = 'book_flight'`

* **`user:` Prefix (User State):**

    * **Scope:** Tied to the `user_id`, shared across *all* sessions for that user (within the same `app_name`).
    * **Persistence:** Persistent with `Database` or `VertexAI`. (Stored by `InMemory` but lost on restart).
    * **Use Cases:** User preferences (e.g., `'user:theme'`), profile details (e.g., `'user:name'`).
    * **Example:** `session.state['user:preferred_language'] = 'fr'`

* **`app:` Prefix (App State):**

    * **Scope:** Tied to the `app_name`, shared across *all* users and sessions for that application.
    * **Persistence:** Persistent with `Database` or `VertexAI`. (Stored by `InMemory` but lost on restart).
    * **Use Cases:** Global settings (e.g., `'app:api_endpoint'`), shared templates.
    * **Example:** `session.state['app:global_discount_code'] = 'SAVE10'`

* **`temp:` Prefix (Temporary Session State):**

    * **Scope:** Specific to the *current* session processing turn.
    * **Persistence:** **Never Persistent.** Guaranteed to be discarded, even with persistent services.
    * **Use Cases:** Intermediate results needed only immediately, data you explicitly don't want stored.
    * **Example:** `session.state['temp:raw_api_response'] = {...}`

**How the Agent Sees It:** Your agent code interacts with the *combined* state through the single `session.state` collection (dict/ Map). The `SessionService` handles fetching/merging state from the correct underlying storage based on prefixes.

### Accessing Session State in Agent Instructions

When working with `LlmAgent` instances, you can directly inject session state values into the agent's instruction string using a simple templating syntax. This allows you to create dynamic and context-aware instructions without relying solely on natural language directives.

#### Using `{key}` Templating

To inject a value from the session state, enclose the key of the desired state variable within curly braces: `{key}`. The framework will automatically replace this placeholder with the corresponding value from `session.state` before passing the instruction to the LLM.

**Example:**

```python
from google.adk.agents import LlmAgent

story_generator = LlmAgent(
    name="StoryGenerator",
    model="gemini-2.0-flash",
    instruction="""Write a short story about a cat, focusing on the theme: {topic}."""
)

# Assuming session.state['topic'] is set to "friendship", the LLM 
# will receive the following instruction:
# "Write a short story about a cat, focusing on the theme: friendship."
```

#### Important Considerations

* Key Existence: Ensure that the key you reference in the instruction string exists in the session.state. If the key is missing, the agent might misbehave or throw an error.
* Data Types: The value associated with the key should be a string or a type that can be easily converted to a string.
* Escaping: If you need to use literal curly braces in your instruction (e.g., for JSON formatting), you'll need to escape them.

#### Bypassing State Injection with `InstructionProvider`

In some cases, you might want to use `{{` and `}}` literally in your instructions without triggering the state injection mechanism. For example, you might be writing instructions for an agent that helps with a templating language that uses the same syntax.

To achieve this, you can provide a function to the `instruction` parameter instead of a string. This function is called an `InstructionProvider`. When you use an `InstructionProvider`, the ADK will not attempt to inject state, and your instruction string will be passed to the model as-is.

The `InstructionProvider` function receives a `ReadonlyContext` object, which you can use to access session state or other contextual information if you need to build the instruction dynamically.

=== "Python"

    ```python
    from google.adk.agents import LlmAgent
    from google.adk.agents.readonly_context import ReadonlyContext

    # This is an InstructionProvider
    def my_instruction_provider(context: ReadonlyContext) -> str:
        # You can optionally use the context to build the instruction
        # For this example, we'll return a static string with literal braces.
        return "This is an instruction with {{literal_braces}} that will not be replaced."

    agent = LlmAgent(
        model="gemini-2.0-flash",
        name="template_helper_agent",
        instruction=my_instruction_provider
    )
    ```

If you want to both use an `InstructionProvider` *and* inject state into your instructions, you can use the `inject_session_state` utility function.

=== "Python"

    ```python
    from google.adk.agents import LlmAgent
    from google.adk.agents.readonly_context import ReadonlyContext
    from google.adk.utils import instructions_utils

    async def my_dynamic_instruction_provider(context: ReadonlyContext) -> str:
        template = "This is a {adjective} instruction with {{literal_braces}}."
        # This will inject the 'adjective' state variable but leave the literal braces.
        return await instructions_utils.inject_session_state(template, context)

    agent = LlmAgent(
        model="gemini-2.0-flash",
        name="dynamic_template_helper_agent",
        instruction=my_dynamic_instruction_provider
    )
    ```

**Benefits of Direct Injection**

* Clarity: Makes it explicit which parts of the instruction are dynamic and based on session state.
* Reliability: Avoids relying on the LLM to correctly interpret natural language instructions to access state.
* Maintainability: Simplifies instruction strings and reduces the risk of errors when updating state variable names.

**Relation to Other State Access Methods**

This direct injection method is specific to LlmAgent instructions. Refer to the following section for more information on other state access methods.

### How State is Updated: Recommended Methods

!!! note "The Right Way to Modify State"
    When you need to change the session state, the correct and safest method is to **directly modify the `state` object on the `Context`** provided to your function (e.g., `callback_context.state['my_key'] = 'new_value'`). This is considered "direct state manipulation" in the right way, as the framework automatically tracks these changes.

    This is critically different from directly modifying the `state` on a `Session` object you retrieve from the `SessionService` (e.g., `my_session.state['my_key'] = 'new_value'`). **You should avoid this**, as it bypasses the ADK's event tracking and can lead to lost data. The "Warning" section at the end of this page has more details on this important distinction.

State should **always** be updated as part of adding an `Event` to the session history using `session_service.append_event()`. This ensures changes are tracked, persistence works correctly, and updates are thread-safe.

**1\. The Easy Way: `output_key` (for Agent Text Responses)**

This is the simplest method for saving an agent's final text response directly into the state. When defining your `LlmAgent`, specify the `output_key`:

=== "Python"

    ```py
    from google.adk.agents import LlmAgent
    from google.adk.sessions import InMemorySessionService, Session
    from google.adk.runners import Runner
    from google.genai.types import Content, Part

    # Define agent with output_key
    greeting_agent = LlmAgent(
        name="Greeter",
        model="gemini-2.0-flash", # Use a valid model
        instruction="Generate a short, friendly greeting.",
        output_key="last_greeting" # Save response to state['last_greeting']
    )

    # --- Setup Runner and Session ---
    app_name, user_id, session_id = "state_app", "user1", "session1"
    session_service = InMemorySessionService()
    runner = Runner(
        agent=greeting_agent,
        app_name=app_name,
        session_service=session_service
    )
    session = await session_service.create_session(app_name=app_name,
                                        user_id=user_id,
                                        session_id=session_id)
    print(f"Initial state: {session.state}")

    # --- Run the Agent ---
    # Runner handles calling append_event, which uses the output_key
    # to automatically create the state_delta.
    user_message = Content(parts=[Part(text="Hello")])
    for event in runner.run(user_id=user_id,
                            session_id=session_id,
                            new_message=user_message):
        if event.is_final_response():
          print(f"Agent responded.") # Response text is also in event.content

    # --- Check Updated State ---
    updated_session = await session_service.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=session_id)
    print(f"State after agent run: {updated_session.state}")
    # Expected output might include: {'last_greeting': 'Hello there! How can I help you today?'}
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/state/GreetingAgentExample.java:full_code"
    ```

Behind the scenes, the `Runner` uses the `output_key` to create the necessary `EventActions` with a `state_delta` and calls `append_event`.

**2\. The Standard Way: `EventActions.state_delta` (for Complex Updates)**

For more complex scenarios (updating multiple keys, non-string values, specific scopes like `user:` or `app:`, or updates not tied directly to the agent's final text), you manually construct the `state_delta` within `EventActions`.

=== "Python"

    ```py
    from google.adk.sessions import InMemorySessionService, Session
    from google.adk.events import Event, EventActions
    from google.genai.types import Part, Content
    import time

    # --- Setup ---
    session_service = InMemorySessionService()
    app_name, user_id, session_id = "state_app_manual", "user2", "session2"
    session = await session_service.create_session(
        app_name=app_name,
        user_id=user_id,
        session_id=session_id,
        state={"user:login_count": 0, "task_status": "idle"}
    )
    print(f"Initial state: {session.state}")

    # --- Define State Changes ---
    current_time = time.time()
    state_changes = {
        "task_status": "active",              # Update session state
        "user:login_count": session.state.get("user:login_count", 0) + 1, # Update user state
        "user:last_login_ts": current_time,   # Add user state
        "temp:validation_needed": True        # Add temporary state (will be discarded)
    }

    # --- Create Event with Actions ---
    actions_with_update = EventActions(state_delta=state_changes)
    # This event might represent an internal system action, not just an agent response
    system_event = Event(
        invocation_id="inv_login_update",
        author="system", # Or 'agent', 'tool' etc.
        actions=actions_with_update,
        timestamp=current_time
        # content might be None or represent the action taken
    )

    # --- Append the Event (This updates the state) ---
    await session_service.append_event(session, system_event)
    print("`append_event` called with explicit state delta.")

    # --- Check Updated State ---
    updated_session = await session_service.get_session(app_name=app_name,
                                                user_id=user_id,
                                                session_id=session_id)
    print(f"State after event: {updated_session.state}")
    # Expected: {'user:login_count': 1, 'task_status': 'active', 'user:last_login_ts': <timestamp>}
    # Note: 'temp:validation_needed' is NOT present.
    ```

=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/state/ManualStateUpdateExample.java:full_code"
    ```

**3. Via `CallbackContext` or `ToolContext` (Recommended for Callbacks and Tools)**

Modifying state within agent callbacks (e.g., `on_before_agent_call`, `on_after_agent_call`) or tool functions is best done using the `state` attribute of the `CallbackContext` or `ToolContext` provided to your function.

*   `callback_context.state['my_key'] = my_value`
*   `tool_context.state['my_key'] = my_value`

These context objects are specifically designed to manage state changes within their respective execution scopes. When you modify `context.state`, the ADK framework ensures that these changes are automatically captured and correctly routed into the `EventActions.state_delta` for the event being generated by the callback or tool. This delta is then processed by the `SessionService` when the event is appended, ensuring proper persistence and tracking.

This method abstracts away the manual creation of `EventActions` and `state_delta` for most common state update scenarios within callbacks and tools, making your code cleaner and less error-prone.

For more comprehensive details on context objects, refer to the [Context documentation](../context/index.md).

=== "Python"

    ```python
    # In an agent callback or tool function
    from google.adk.agents import CallbackContext # or ToolContext

    def my_callback_or_tool_function(context: CallbackContext, # Or ToolContext
                                     # ... other parameters ...
                                    ):
        # Update existing state
        count = context.state.get("user_action_count", 0)
        context.state["user_action_count"] = count + 1

        # Add new state
        context.state["temp:last_operation_status"] = "success"

        # State changes are automatically part of the event's state_delta
        # ... rest of callback/tool logic ...
    ```

=== "Java"

    ```java
    // In an agent callback or tool method
    import com.google.adk.agents.CallbackContext; // or ToolContext
    // ... other imports ...

    public class MyAgentCallbacks {
        public void onAfterAgent(CallbackContext callbackContext) {
            // Update existing state
            Integer count = (Integer) callbackContext.state().getOrDefault("user_action_count", 0);
            callbackContext.state().put("user_action_count", count + 1);

            // Add new state
            callbackContext.state().put("temp:last_operation_status", "success");

            // State changes are automatically part of the event's state_delta
            // ... rest of callback logic ...
        }
    }
    ```

**What `append_event` Does:**

* Adds the `Event` to `session.events`.
* Reads the `state_delta` from the event's `actions`.
* Applies these changes to the state managed by the `SessionService`, correctly handling prefixes and persistence based on the service type.
* Updates the session's `last_update_time`.
* Ensures thread-safety for concurrent updates.

### ⚠️ A Warning About Direct State Modification

Avoid directly modifying the `session.state` collection (dictionary/Map) on a `Session` object that was obtained directly from the `SessionService` (e.g., via `session_service.get_session()` or `session_service.create_session()`) *outside* of the managed lifecycle of an agent invocation (i.e., not through a `CallbackContext` or `ToolContext`). For example, code like `retrieved_session = await session_service.get_session(...); retrieved_session.state['key'] = value` is problematic.

State modifications *within* callbacks or tools using `CallbackContext.state` or `ToolContext.state` are the correct way to ensure changes are tracked, as these context objects handle the necessary integration with the event system.

**Why direct modification (outside of contexts) is strongly discouraged:**

1. **Bypasses Event History:** The change isn't recorded as an `Event`, losing auditability.
2. **Breaks Persistence:** Changes made this way **will likely NOT be saved** by `DatabaseSessionService` or `VertexAiSessionService`. They rely on `append_event` to trigger saving.
3. **Not Thread-Safe:** Can lead to race conditions and lost updates.
4. **Ignores Timestamps/Logic:** Doesn't update `last_update_time` or trigger related event logic.

**Recommendation:** Stick to updating state via `output_key`, `EventActions.state_delta` (when manually creating events), or by modifying the `state` property of `CallbackContext` or `ToolContext` objects when within their respective scopes. These methods ensure reliable, trackable, and persistent state management. Use direct access to `session.state` (from a `SessionService`-retrieved session) only for *reading* state.

### Best Practices for State Design Recap

* **Minimalism:** Store only essential, dynamic data.
* **Serialization:** Use basic, serializable types.
* **Descriptive Keys & Prefixes:** Use clear names and appropriate prefixes (`user:`, `app:`, `temp:`, or none).
* **Shallow Structures:** Avoid deep nesting where possible.
* **Standard Update Flow:** Rely on `append_event`.


Directory structure:
└── callbacks/
    ├── design-patterns-and-best-practices.md
    ├── index.md
    └── types-of-callbacks.md

================================================
FILE: docs/callbacks/design-patterns-and-best-practices.md
================================================
# Design Patterns and Best Practices for Callbacks

Callbacks offer powerful hooks into the agent lifecycle. Here are common design patterns illustrating how to leverage them effectively in ADK, followed by best practices for implementation.

## Design Patterns

These patterns demonstrate typical ways to enhance or control agent behavior using callbacks:

### 1. Guardrails & Policy Enforcement

* **Pattern:** Intercept requests before they reach the LLM or tools to enforce rules.
* **How:** Use `before_model_callback` to inspect the `LlmRequest` prompt or `before_tool_callback` to inspect tool arguments. If a policy violation is detected (e.g., forbidden topics, profanity), return a predefined response (`LlmResponse` or `dict`/ `Map`) to block the operation and optionally update `context.state` to log the violation.
* **Example:** A `before_model_callback` checks `llm_request.contents` for sensitive keywords and returns a standard "Cannot process this request" `LlmResponse` if found, preventing the LLM call.

### 2. Dynamic State Management

* **Pattern:** Read from and write to session state within callbacks to make agent behavior context-aware and pass data between steps.
* **How:** Access `callback_context.state` or `tool_context.state`. Modifications (`state['key'] = value`) are automatically tracked in the subsequent `Event.actions.state_delta` for persistence by the `SessionService`.
* **Example:** An `after_tool_callback` saves a `transaction_id` from the tool's result to `tool_context.state['last_transaction_id']`. A later `before_agent_callback` might read `state['user_tier']` to customize the agent's greeting.

### 3. Logging and Monitoring

* **Pattern:** Add detailed logging at specific lifecycle points for observability and debugging.
* **How:** Implement callbacks (e.g., `before_agent_callback`, `after_tool_callback`, `after_model_callback`) to print or send structured logs containing information like agent name, tool name, invocation ID, and relevant data from the context or arguments.
* **Example:** Log messages like `INFO: [Invocation: e-123] Before Tool: search_api - Args: {'query': 'ADK'}`.

### 4. Caching

* **Pattern:** Avoid redundant LLM calls or tool executions by caching results.
* **How:** In `before_model_callback` or `before_tool_callback`, generate a cache key based on the request/arguments. Check `context.state` (or an external cache) for this key. If found, return the cached `LlmResponse` or result directly, skipping the actual operation. If not found, allow the operation to proceed and use the corresponding `after_` callback (`after_model_callback`, `after_tool_callback`) to store the new result in the cache using the key.
*   **Example:** `before_tool_callback` for `get_stock_price(symbol)` checks `state[f"cache:stock:{symbol}"]`. If present, returns the cached price; otherwise, allows the API call and `after_tool_callback` saves the result to the state key.

### 5. Request/Response Modification

* **Pattern:** Alter data just before it's sent to the LLM/tool or just after it's received.
* **How:**
    * `before_model_callback`: Modify `llm_request` (e.g., add system instructions based on `state`).
    * `after_model_callback`: Modify the returned `LlmResponse` (e.g., format text, filter content).
    *  `before_tool_callback`: Modify the tool `args` dictionary (or Map in Java).
    *  `after_tool_callback`: Modify the `tool_response` dictionary (or Map in Java).
* **Example:** `before_model_callback` appends "User language preference: Spanish" to `llm_request.config.system_instruction` if `context.state['lang'] == 'es'`.

### 6. Conditional Skipping of Steps

* **Pattern:** Prevent standard operations (agent run, LLM call, tool execution) based on certain conditions.
* **How:** Return a value from a `before_` callback (`Content` from `before_agent_callback`, `LlmResponse` from `before_model_callback`, `dict` from `before_tool_callback`). The framework interprets this returned value as the result for that step, skipping the normal execution.
* **Example:** `before_tool_callback` checks `tool_context.state['api_quota_exceeded']`. If `True`, it returns `{'error': 'API quota exceeded'}`, preventing the actual tool function from running.

### 7. Tool-Specific Actions (Authentication & Summarization Control)

* **Pattern:** Handle actions specific to the tool lifecycle, primarily authentication and controlling LLM summarization of tool results.
* **How:** Use `ToolContext` within tool callbacks (`before_tool_callback`, `after_tool_callback`).
    * **Authentication:** Call `tool_context.request_credential(auth_config)` in `before_tool_callback` if credentials are required but not found (e.g., via `tool_context.get_auth_response` or state check). This initiates the auth flow.
    * **Summarization:** Set `tool_context.actions.skip_summarization = True` if the raw dictionary output of the tool should be passed back to the LLM or potentially displayed directly, bypassing the default LLM summarization step.
* **Example:** A `before_tool_callback` for a secure API checks for an auth token in state; if missing, it calls `request_credential`. An `after_tool_callback` for a tool returning structured JSON might set `skip_summarization = True`.

### 8. Artifact Handling

* **Pattern:** Save or load session-related files or large data blobs during the agent lifecycle.
* **How:** Use `callback_context.save_artifact` / `await tool_context.save_artifact` to store data (e.g., generated reports, logs, intermediate data). Use `load_artifact` to retrieve previously stored artifacts. Changes are tracked via `Event.actions.artifact_delta`.
* **Example:** An `after_tool_callback` for a "generate_report" tool saves the output file using `await tool_context.save_artifact("report.pdf", report_part)`. A `before_agent_callback` might load a configuration artifact using `callback_context.load_artifact("agent_config.json")`.

## Best Practices for Callbacks

* **Keep Focused:** Design each callback for a single, well-defined purpose (e.g., just logging, just validation). Avoid monolithic callbacks.
* **Mind Performance:** Callbacks execute synchronously within the agent's processing loop. Avoid long-running or blocking operations (network calls, heavy computation). Offload if necessary, but be aware this adds complexity.
* **Handle Errors Gracefully:** Use `try...except/ catch` blocks within your callback functions. Log errors appropriately and decide if the agent invocation should halt or attempt recovery. Don't let callback errors crash the entire process.
* **Manage State Carefully:**
    * Be deliberate about reading from and writing to `context.state`. Changes are immediately visible within the *current* invocation and persisted at the end of the event processing.
    * Use specific state keys rather than modifying broad structures to avoid unintended side effects.
    *  Consider using state prefixes (`State.APP_PREFIX`, `State.USER_PREFIX`, `State.TEMP_PREFIX`) for clarity, especially with persistent `SessionService` implementations.
* **Consider Idempotency:** If a callback performs actions with external side effects (e.g., incrementing an external counter), design it to be idempotent (safe to run multiple times with the same input) if possible, to handle potential retries in the framework or your application.
* **Test Thoroughly:** Unit test your callback functions using mock context objects. Perform integration tests to ensure callbacks function correctly within the full agent flow.
* **Ensure Clarity:** Use descriptive names for your callback functions. Add clear docstrings explaining their purpose, when they run, and any side effects (especially state modifications).
* **Use Correct Context Type:** Always use the specific context type provided (`CallbackContext` for agent/model, `ToolContext` for tools) to ensure access to the appropriate methods and properties.

By applying these patterns and best practices, you can effectively use callbacks to create more robust, observable, and customized agent behaviors in ADK.


================================================
FILE: docs/callbacks/index.md
================================================
# Callbacks: Observe, Customize, and Control Agent Behavior

## Introduction: What are Callbacks and Why Use Them?

Callbacks are a cornerstone feature of ADK, providing a powerful mechanism to hook into an agent's execution process. They allow you to observe, customize, and even control the agent's behavior at specific, predefined points without modifying the core ADK framework code.

**What are they?** In essence, callbacks are standard functions that you define. You then associate these functions with an agent when you create it. The ADK framework automatically calls your functions at key stages, letting you observe or intervene. Think of it like checkpoints during the agent's process:

* **Before the agent starts its main work on a request, and after it finishes:** When you ask an agent to do something (e.g., answer a question), it runs its internal logic to figure out the response.
  * The `Before Agent` callback executes *right before* this main work begins for that specific request.
  * The `After Agent` callback executes *right after* the agent has finished all its steps for that request and has prepared the final result, but just before the result is returned.
  * This "main work" encompasses the agent's *entire* process for handling that single request. This might involve deciding to call an LLM, actually calling the LLM, deciding to use a tool, using the tool, processing the results, and finally putting together the answer. These callbacks essentially wrap the whole sequence from receiving the input to producing the final output for that one interaction.
* **Before sending a request to, or after receiving a response from, the Large Language Model (LLM):** These callbacks (`Before Model`, `After Model`) allow you to inspect or modify the data going to and coming from the LLM specifically.
* **Before executing a tool (like a Python function or another agent) or after it finishes:** Similarly, `Before Tool` and `After Tool` callbacks give you control points specifically around the execution of tools invoked by the agent.


![intro_components.png](../assets/callback_flow.png)

**Why use them?** Callbacks unlock significant flexibility and enable advanced agent capabilities:

* **Observe & Debug:** Log detailed information at critical steps for monitoring and troubleshooting.  
* **Customize & Control:** Modify data flowing through the agent (like LLM requests or tool results) or even bypass certain steps entirely based on your logic.  
* **Implement Guardrails:** Enforce safety rules, validate inputs/outputs, or prevent disallowed operations.  
* **Manage State:** Read or dynamically update the agent's session state during execution.  
* **Integrate & Enhance:** Trigger external actions (API calls, notifications) or add features like caching.

**How are they added:** 

??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/callback_basic.py:callback_basic"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/AgentWithBeforeModelCallback.java:init"
        ```

## The Callback Mechanism: Interception and Control

When the ADK framework encounters a point where a callback can run (e.g., just before calling the LLM), it checks if you provided a corresponding callback function for that agent. If you did, the framework executes your function.

**Context is Key:** Your callback function isn't called in isolation. The framework provides special **context objects** (`CallbackContext` or `ToolContext`) as arguments. These objects contain vital information about the current state of the agent's execution, including the invocation details, session state, and potentially references to services like artifacts or memory. You use these context objects to understand the situation and interact with the framework. (See the dedicated "Context Objects" section for full details).

**Controlling the Flow (The Core Mechanism):** The most powerful aspect of callbacks lies in how their **return value** influences the agent's subsequent actions. This is how you intercept and control the execution flow:

1. **`return None` (Allow Default Behavior):**  

    * The specific return type can vary depending on the language. In Java, the equivalent return type is `Optional.empty()`. Refer to the API documentation for language specific guidance.
    * This is the standard way to signal that your callback has finished its work (e.g., logging, inspection, minor modifications to *mutable* input arguments like `llm_request`) and that the ADK agent should **proceed with its normal operation**.  
    * For `before_*` callbacks (`before_agent`, `before_model`, `before_tool`), returning `None` means the next step in the sequence (running the agent logic, calling the LLM, executing the tool) will occur.  
    * For `after_*` callbacks (`after_agent`, `after_model`, `after_tool`), returning `None` means the result just produced by the preceding step (the agent's output, the LLM's response, the tool's result) will be used as is.

2. **`return <Specific Object>` (Override Default Behavior):**  

    * Returning a *specific type of object* (instead of `None`) is how you **override** the ADK agent's default behavior. The framework will use the object you return and *skip* the step that would normally follow or *replace* the result that was just generated.  
    * **`before_agent_callback` → `types.Content`**: Skips the agent's main execution logic (`_run_async_impl` / `_run_live_impl`). The returned `Content` object is immediately treated as the agent's final output for this turn. Useful for handling simple requests directly or enforcing access control.  
    * **`before_model_callback` → `LlmResponse`**: Skips the call to the external Large Language Model. The returned `LlmResponse` object is processed as if it were the actual response from the LLM. Ideal for implementing input guardrails, prompt validation, or serving cached responses.  
    * **`before_tool_callback` → `dict` or `Map`**: Skips the execution of the actual tool function (or sub-agent). The returned `dict` is used as the result of the tool call, which is then typically passed back to the LLM. Perfect for validating tool arguments, applying policy restrictions, or returning mocked/cached tool results.  
    * **`after_agent_callback` → `types.Content`**: *Replaces* the `Content` that the agent's run logic just produced.  
    * **`after_model_callback` → `LlmResponse`**: *Replaces* the `LlmResponse` received from the LLM. Useful for sanitizing outputs, adding standard disclaimers, or modifying the LLM's response structure.  
    * **`after_tool_callback` → `dict` or `Map`**: *Replaces* the `dict` result returned by the tool. Allows for post-processing or standardization of tool outputs before they are sent back to the LLM.

**Conceptual Code Example (Guardrail):**

This example demonstrates the common pattern for a guardrail using `before_model_callback`.

<!-- ```py
--8<-- "examples/python/snippets/callbacks/before_model_callback.py"
``` -->
??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/before_model_callback.py"
        ```
    
    === "Java"
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/BeforeModelGuardrailExample.java:init"
        ```

By understanding this mechanism of returning `None` versus returning specific objects, you can precisely control the agent's execution path, making callbacks an essential tool for building sophisticated and reliable agents with ADK.



================================================
FILE: docs/callbacks/types-of-callbacks.md
================================================
# Types of Callbacks

The framework provides different types of callbacks that trigger at various stages of an agent's execution. Understanding when each callback fires and what context it receives is key to using them effectively.

## Agent Lifecycle Callbacks

These callbacks are available on *any* agent that inherits from `BaseAgent` (including `LlmAgent`, `SequentialAgent`, `ParallelAgent`, `LoopAgent`, etc).

!!! Note
    The specific method names or return types may vary slightly by SDK language (e.g., return `None` in Python, return `Optional.empty()` or `Maybe.empty()` in Java). Refer to the language-specific API documentation for details.

### Before Agent Callback

**When:** Called *immediately before* the agent's `_run_async_impl` (or `_run_live_impl`) method is executed. It runs after the agent's `InvocationContext` is created but *before* its core logic begins.

**Purpose:** Ideal for setting up resources or state needed only for this specific agent's run, performing validation checks on the session state (callback\_context.state) before execution starts, logging the entry point of the agent's activity, or potentially modifying the invocation context before the core logic uses it.


??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/before_agent_callback.py"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/BeforeAgentCallbackExample.java:init"
        ```


**Note on the `before_agent_callback` Example:**

* **What it Shows:** This example demonstrates the `before_agent_callback`. This callback runs *right before* the agent's main processing logic starts for a given request.
* **How it Works:** The callback function (`check_if_agent_should_run`) looks at a flag (`skip_llm_agent`) in the session's state.
    * If the flag is `True`, the callback returns a `types.Content` object. This tells the ADK framework to **skip** the agent's main execution entirely and use the callback's returned content as the final response.
    * If the flag is `False` (or not set), the callback returns `None` or an empty object. This tells the ADK framework to **proceed** with the agent's normal execution (calling the LLM in this case).
* **Expected Outcome:** You'll see two scenarios:
    1. In the session *with* the `skip_llm_agent: True` state, the agent's LLM call is bypassed, and the output comes directly from the callback ("Agent... skipped...").
    2. In the session *without* that state flag, the callback allows the agent to run, and you see the actual response from the LLM (e.g., "Hello!").
* **Understanding Callbacks:** This highlights how `before_` callbacks act as **gatekeepers**, allowing you to intercept execution *before* a major step and potentially prevent it based on checks (like state, input validation, permissions).


### After Agent Callback

**When:** Called *immediately after* the agent's `_run_async_impl` (or `_run_live_impl`) method successfully completes. It does *not* run if the agent was skipped due to `before_agent_callback` returning content or if `end_invocation` was set during the agent's run.

**Purpose:** Useful for cleanup tasks, post-execution validation, logging the completion of an agent's activity, modifying final state, or augmenting/replacing the agent's final output.

??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/after_agent_callback.py"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/AfterAgentCallbackExample.java:init"
        ```


**Note on the `after_agent_callback` Example:**

* **What it Shows:** This example demonstrates the `after_agent_callback`. This callback runs *right after* the agent's main processing logic has finished and produced its result, but *before* that result is finalized and returned.
* **How it Works:** The callback function (`modify_output_after_agent`) checks a flag (`add_concluding_note`) in the session's state.
    * If the flag is `True`, the callback returns a *new* `types.Content` object. This tells the ADK framework to **replace** the agent's original output with the content returned by the callback.
    * If the flag is `False` (or not set), the callback returns `None` or an empty object. This tells the ADK framework to **use** the original output generated by the agent.
*   **Expected Outcome:** You'll see two scenarios:
    1. In the session *without* the `add_concluding_note: True` state, the callback allows the agent's original output ("Processing complete!") to be used.
    2. In the session *with* that state flag, the callback intercepts the agent's original output and replaces it with its own message ("Concluding note added...").
* **Understanding Callbacks:** This highlights how `after_` callbacks allow **post-processing** or **modification**. You can inspect the result of a step (the agent's run) and decide whether to let it pass through, change it, or completely replace it based on your logic.

## LLM Interaction Callbacks

These callbacks are specific to `LlmAgent` and provide hooks around the interaction with the Large Language Model.

### Before Model Callback

**When:** Called just before the `generate_content_async` (or equivalent) request is sent to the LLM within an `LlmAgent`'s flow.

**Purpose:** Allows inspection and modification of the request going to the LLM. Use cases include adding dynamic instructions, injecting few-shot examples based on state, modifying model config, implementing guardrails (like profanity filters), or implementing request-level caching.

**Return Value Effect:**  
If the callback returns `None` (or a `Maybe.empty()` object in Java), the LLM continues its normal workflow. If the callback returns an `LlmResponse` object, then the call to the LLM is **skipped**. The returned `LlmResponse` is used directly as if it came from the model. This is powerful for implementing guardrails or caching.

??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/before_model_callback.py"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/BeforeModelCallbackExample.java:init"
        ```

### After Model Callback

**When:** Called just after a response (`LlmResponse`) is received from the LLM, before it's processed further by the invoking agent.

**Purpose:** Allows inspection or modification of the raw LLM response. Use cases include

* logging model outputs,
* reformatting responses,
* censoring sensitive information generated by the model,
* parsing structured data from the LLM response and storing it in `callback_context.state`
* or handling specific error codes.

??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/after_model_callback.py"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/AfterModelCallbackExample.java:init"
        ```

## Tool Execution Callbacks

These callbacks are also specific to `LlmAgent` and trigger around the execution of tools (including `FunctionTool`, `AgentTool`, etc.) that the LLM might request.

### Before Tool Callback

**When:** Called just before a specific tool's `run_async` method is invoked, after the LLM has generated a function call for it.

**Purpose:** Allows inspection and modification of tool arguments, performing authorization checks before execution, logging tool usage attempts, or implementing tool-level caching.

**Return Value Effect:**

1. If the callback returns `None` (or a `Maybe.empty()` object in Java), the tool's `run_async` method is executed with the (potentially modified) `args`.  
2. If a dictionary (or `Map` in Java) is returned, the tool's `run_async` method is **skipped**. The returned dictionary is used directly as the result of the tool call. This is useful for caching or overriding tool behavior.  


??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/before_tool_callback.py"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/BeforeToolCallbackExample.java:init"
        ```



### After Tool Callback

**When:** Called just after the tool's `run_async` method completes successfully.

**Purpose:** Allows inspection and modification of the tool's result before it's sent back to the LLM (potentially after summarization). Useful for logging tool results, post-processing or formatting results, or saving specific parts of the result to the session state.

**Return Value Effect:**

1. If the callback returns `None` (or a `Maybe.empty()` object in Java), the original `tool_response` is used.  
2. If a new dictionary is returned, it **replaces** the original `tool_response`. This allows modifying or filtering the result seen by the LLM.

??? "Code"
    === "Python"
    
        ```python
        --8<-- "examples/python/snippets/callbacks/after_tool_callback.py"
        ```
    
    === "Java"
    
        ```java
        --8<-- "examples/java/snippets/src/main/java/callbacks/AfterToolCallbackExample.java:init"
        ```


Directory structure:
└── artifacts/
    └── index.md

================================================
FILE: docs/artifacts/index.md
================================================
# Artifacts

In ADK, **Artifacts** represent a crucial mechanism for managing named, versioned binary data associated either with a specific user interaction session or persistently with a user across multiple sessions. They allow your agents and tools to handle data beyond simple text strings, enabling richer interactions involving files, images, audio, and other binary formats.

!!! Note
    The specific parameters or method names for the primitives may vary slightly by SDK language (e.g., `save_artifact` in Python, `saveArtifact` in Java). Refer to the language-specific API documentation for details.

## What are Artifacts?

*   **Definition:** An Artifact is essentially a piece of binary data (like the content of a file) identified by a unique `filename` string within a specific scope (session or user). Each time you save an artifact with the same filename, a new version is created.

*   **Representation:** Artifacts are consistently represented using the standard `google.genai.types.Part` object. The core data is typically stored within an inline data structure of the `Part` (accessed via `inline_data`), which itself contains:
    *   `data`: The raw binary content as bytes.
    *   `mime_type`: A string indicating the type of the data (e.g., `"image/png"`, `"application/pdf"`). This is essential for correctly interpreting the data later.


=== "Python"

    ```py
    # Example of how an artifact might be represented as a types.Part
    import google.genai.types as types

    # Assume 'image_bytes' contains the binary data of a PNG image
    image_bytes = b'\x89PNG\r\n\x1a\n...' # Placeholder for actual image bytes

    image_artifact = types.Part(
        inline_data=types.Blob(
            mime_type="image/png",
            data=image_bytes
        )
    )

    # You can also use the convenience constructor:
    # image_artifact_alt = types.Part.from_bytes(data=image_bytes, mime_type="image/png")

    print(f"Artifact MIME Type: {image_artifact.inline_data.mime_type}")
    print(f"Artifact Data (first 10 bytes): {image_artifact.inline_data.data[:10]}...")
    ```

=== "Java"

    ```java
    import com.google.genai.types.Part;
    import java.nio.charset.StandardCharsets;

    public class ArtifactExample {
        public static void main(String[] args) {
            // Assume 'imageBytes' contains the binary data of a PNG image
            byte[] imageBytes = {(byte) 0x89, (byte) 0x50, (byte) 0x4E, (byte) 0x47, (byte) 0x0D, (byte) 0x0A, (byte) 0x1A, (byte) 0x0A, (byte) 0x01, (byte) 0x02}; // Placeholder for actual image bytes

            // Create an image artifact using Part.fromBytes
            Part imageArtifact = Part.fromBytes(imageBytes, "image/png");

            System.out.println("Artifact MIME Type: " + imageArtifact.inlineData().get().mimeType().get());
            System.out.println(
                "Artifact Data (first 10 bytes): "
                    + new String(imageArtifact.inlineData().get().data().get(), 0, 10, StandardCharsets.UTF_8)
                    + "...");
        }
    }
    ```

*   **Persistence & Management:** Artifacts are not stored directly within the agent or session state. Their storage and retrieval are managed by a dedicated **Artifact Service** (an implementation of `BaseArtifactService`, defined in `google.adk.artifacts`. ADK provides various implementations, such as:
    *   An in-memory service for testing or temporary storage (e.g., `InMemoryArtifactService` in Python, defined in `google.adk.artifacts.in_memory_artifact_service.py`).
    *   A service for persistent storage using Google Cloud Storage (GCS) (e.g., `GcsArtifactService` in Python, defined in `google.adk.artifacts.gcs_artifact_service.py`).
    The chosen service implementation handles versioning automatically when you save data.

## Why Use Artifacts?

While session `state` is suitable for storing small pieces of configuration or conversational context (like strings, numbers, booleans, or small dictionaries/lists), Artifacts are designed for scenarios involving binary or large data:

1. **Handling Non-Textual Data:** Easily store and retrieve images, audio clips, video snippets, PDFs, spreadsheets, or any other file format relevant to your agent's function.  
2. **Persisting Large Data:** Session state is generally not optimized for storing large amounts of data. Artifacts provide a dedicated mechanism for persisting larger blobs without cluttering the session state.  
3. **User File Management:** Provide capabilities for users to upload files (which can be saved as artifacts) and retrieve or download files generated by the agent (loaded from artifacts).  
4. **Sharing Outputs:** Enable tools or agents to generate binary outputs (like a PDF report or a generated image) that can be saved via `save_artifact` and later accessed by other parts of the application or even in subsequent sessions (if using user namespacing).  
5. **Caching Binary Data:** Store the results of computationally expensive operations that produce binary data (e.g., rendering a complex chart image) as artifacts to avoid regenerating them on subsequent requests.

In essence, whenever your agent needs to work with file-like binary data that needs to be persisted, versioned, or shared, Artifacts managed by an `ArtifactService` are the appropriate mechanism within ADK.


## Common Use Cases

Artifacts provide a flexible way to handle binary data within your ADK applications.

Here are some typical scenarios where they prove valuable:

* **Generated Reports/Files:**
    * A tool or agent generates a report (e.g., a PDF analysis, a CSV data export, an image chart).

* **Handling User Uploads:**

    * A user uploads a file (e.g., an image for analysis, a document for summarization) through a front-end interface.

* **Storing Intermediate Binary Results:**

    * An agent performs a complex multi-step process where one step generates intermediate binary data (e.g., audio synthesis, simulation results).

* **Persistent User Data:**

    * Storing user-specific configuration or data that isn't a simple key-value state.

* **Caching Generated Binary Content:**

    * An agent frequently generates the same binary output based on certain inputs (e.g., a company logo image, a standard audio greeting).



## Core Concepts

Understanding artifacts involves grasping a few key components: the service that manages them, the data structure used to hold them, and how they are identified and versioned.

### Artifact Service (`BaseArtifactService`)

* **Role:** The central component responsible for the actual storage and retrieval logic for artifacts. It defines *how* and *where* artifacts are persisted.  

* **Interface:** Defined by the abstract base class `BaseArtifactService`. Any concrete implementation must provide methods for:  

    * `Save Artifact`: Stores the artifact data and returns its assigned version number.  
    * `Load Artifact`: Retrieves a specific version (or the latest) of an artifact.  
    * `List Artifact keys`: Lists the unique filenames of artifacts within a given scope.  
    * `Delete Artifact`: Removes an artifact (and potentially all its versions, depending on implementation).  
    * `List versions`: Lists all available version numbers for a specific artifact filename.

* **Configuration:** You provide an instance of an artifact service (e.g., `InMemoryArtifactService`, `GcsArtifactService`) when initializing the `Runner`. The `Runner` then makes this service available to agents and tools via the `InvocationContext`.

=== "Python"

    ```py
    from google.adk.runners import Runner
    from google.adk.artifacts import InMemoryArtifactService # Or GcsArtifactService
    from google.adk.agents import LlmAgent # Any agent
    from google.adk.sessions import InMemorySessionService

    # Example: Configuring the Runner with an Artifact Service
    my_agent = LlmAgent(name="artifact_user_agent", model="gemini-2.0-flash")
    artifact_service = InMemoryArtifactService() # Choose an implementation
    session_service = InMemorySessionService()

    runner = Runner(
        agent=my_agent,
        app_name="my_artifact_app",
        session_service=session_service,
        artifact_service=artifact_service # Provide the service instance here
    )
    # Now, contexts within runs managed by this runner can use artifact methods
    ```

=== "Java"
    
    ```java
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.runner.Runner;
    import com.google.adk.sessions.InMemorySessionService;
    import com.google.adk.artifacts.InMemoryArtifactService;
    
    // Example: Configuring the Runner with an Artifact Service
    LlmAgent myAgent =  LlmAgent.builder()
      .name("artifact_user_agent")
      .model("gemini-2.0-flash")
      .build();
    InMemoryArtifactService artifactService = new InMemoryArtifactService(); // Choose an implementation
    InMemorySessionService sessionService = new InMemorySessionService();

    Runner runner = new Runner(myAgent, "my_artifact_app", artifactService, sessionService); // Provide the service instance here
    // Now, contexts within runs managed by this runner can use artifact methods
    ```

### Artifact Data

* **Standard Representation:** Artifact content is universally represented using the `google.genai.types.Part` object, the same structure used for parts of LLM messages.  

* **Key Attribute (`inline_data`):** For artifacts, the most relevant attribute is `inline_data`, which is a `google.genai.types.Blob` object containing:  

    * `data` (`bytes`): The raw binary content of the artifact.  
    * `mime_type` (`str`): A standard MIME type string (e.g., `'application/pdf'`, `'image/png'`, `'audio/mpeg'`) describing the nature of the binary data. **This is crucial for correct interpretation when loading the artifact.**

=== "Python"

    ```python
    import google.genai.types as types

    # Example: Creating an artifact Part from raw bytes
    pdf_bytes = b'%PDF-1.4...' # Your raw PDF data
    pdf_mime_type = "application/pdf"

    # Using the constructor
    pdf_artifact_py = types.Part(
        inline_data=types.Blob(data=pdf_bytes, mime_type=pdf_mime_type)
    )

    # Using the convenience class method (equivalent)
    pdf_artifact_alt_py = types.Part.from_bytes(data=pdf_bytes, mime_type=pdf_mime_type)

    print(f"Created Python artifact with MIME type: {pdf_artifact_py.inline_data.mime_type}")
    ```
    
=== "Java"

    ```java
    --8<-- "examples/java/snippets/src/main/java/artifacts/ArtifactDataExample.java:full_code"
    ```

### Filename

* **Identifier:** A simple string used to name and retrieve an artifact within its specific namespace.  
* **Uniqueness:** Filenames must be unique within their scope (either the session or the user namespace).  
* **Best Practice:** Use descriptive names, potentially including file extensions (e.g., `"monthly_report.pdf"`, `"user_avatar.jpg"`), although the extension itself doesn't dictate behavior – the `mime_type` does.

### Versioning

* **Automatic Versioning:** The artifact service automatically handles versioning. When you call `save_artifact`, the service determines the next available version number (typically starting from 0 and incrementing) for that specific filename and scope.  
* **Returned by `save_artifact`:** The `save_artifact` method returns the integer version number that was assigned to the newly saved artifact.  
* **Retrieval:**  
  * `load_artifact(..., version=None)` (default): Retrieves the *latest* available version of the artifact.  
  * `load_artifact(..., version=N)`: Retrieves the specific version `N`.  
* **Listing Versions:** The `list_versions` method (on the service, not context) can be used to find all existing version numbers for an artifact.

### Namespacing (Session vs. User)

* **Concept:** Artifacts can be scoped either to a specific session or more broadly to a user across all their sessions within the application. This scoping is determined by the `filename` format and handled internally by the `ArtifactService`.  

* **Default (Session Scope):** If you use a plain filename like `"report.pdf"`, the artifact is associated with the specific `app_name`, `user_id`, *and* `session_id`. It's only accessible within that exact session context.  


* **User Scope (`"user:"` prefix):** If you prefix the filename with `"user:"`, like `"user:profile.png"`, the artifact is associated only with the `app_name` and `user_id`. It can be accessed or updated from *any* session belonging to that user within the app.  


=== "Python"

    ```python
    # Example illustrating namespace difference (conceptual)

    # Session-specific artifact filename
    session_report_filename = "summary.txt"

    # User-specific artifact filename
    user_config_filename = "user:settings.json"

    # When saving 'summary.txt' via context.save_artifact,
    # it's tied to the current app_name, user_id, and session_id.

    # When saving 'user:settings.json' via context.save_artifact,
    # the ArtifactService implementation should recognize the "user:" prefix
    # and scope it to app_name and user_id, making it accessible across sessions for that user.
    ```

=== "Java"

    ```java
    // Example illustrating namespace difference (conceptual)
    
    // Session-specific artifact filename
    String sessionReportFilename = "summary.txt";
    
    // User-specific artifact filename
    String userConfigFilename = "user:settings.json"; // The "user:" prefix is key
    
    // When saving 'summary.txt' via context.save_artifact,
    // it's tied to the current app_name, user_id, and session_id.
    // artifactService.saveArtifact(appName, userId, sessionId1, sessionReportFilename, someData);
    
    // When saving 'user:settings.json' via context.save_artifact,
    // the ArtifactService implementation should recognize the "user:" prefix
    // and scope it to app_name and user_id, making it accessible across sessions for that user.
    // artifactService.saveArtifact(appName, userId, sessionId1, userConfigFilename, someData);
    ```

These core concepts work together to provide a flexible system for managing binary data within the ADK framework.

## Interacting with Artifacts (via Context Objects)

The primary way you interact with artifacts within your agent's logic (specifically within callbacks or tools) is through methods provided by the `CallbackContext` and `ToolContext` objects. These methods abstract away the underlying storage details managed by the `ArtifactService`.

### Prerequisite: Configuring the `ArtifactService`

Before you can use any artifact methods via the context objects, you **must** provide an instance of a [`BaseArtifactService` implementation](#available-implementations) (like [`InMemoryArtifactService`](#inmemoryartifactservice) or [`GcsArtifactService`](#gcsartifactservice)) when initializing your `Runner`.

=== "Python"

    In Python, you provide this instance when initializing your `Runner`.

    ```python
    from google.adk.runners import Runner
    from google.adk.artifacts import InMemoryArtifactService # Or GcsArtifactService
    from google.adk.agents import LlmAgent
    from google.adk.sessions import InMemorySessionService

    # Your agent definition
    agent = LlmAgent(name="my_agent", model="gemini-2.0-flash")

    # Instantiate the desired artifact service
    artifact_service = InMemoryArtifactService()

    # Provide it to the Runner
    runner = Runner(
        agent=agent,
        app_name="artifact_app",
        session_service=InMemorySessionService(),
        artifact_service=artifact_service # Service must be provided here
    )
    ```
    If no `artifact_service` is configured in the `InvocationContext` (which happens if it's not passed to the `Runner`), calling `save_artifact`, `load_artifact`, or `list_artifacts` on the context objects will raise a `ValueError`.

=== "Java"

    In Java, you would instantiate a `BaseArtifactService` implementation and then ensure it's accessible to the parts of your application that manage artifacts. This is often done through dependency injection or by explicitly passing the service instance.

    ```java
    import com.google.adk.agents.LlmAgent;
    import com.google.adk.artifacts.InMemoryArtifactService; // Or GcsArtifactService
    import com.google.adk.runner.Runner;
    import com.google.adk.sessions.InMemorySessionService;
    
    public class SampleArtifactAgent {
    
      public static void main(String[] args) {
    
        // Your agent definition
        LlmAgent agent = LlmAgent.builder()
            .name("my_agent")
            .model("gemini-2.0-flash")
            .build();
    
        // Instantiate the desired artifact service
        InMemoryArtifactService artifactService = new InMemoryArtifactService();
    
        // Provide it to the Runner
        Runner runner = new Runner(agent,
            "APP_NAME",
            artifactService, // Service must be provided here
            new InMemorySessionService());
    
      }
    }
    ```
    In Java, if an `ArtifactService` instance is not available (e.g., `null`) when artifact operations are attempted, it would typically result in a `NullPointerException` or a custom error, depending on how your application is structured. Robust applications often use dependency injection frameworks to manage service lifecycles and ensure availability.


### Accessing Methods

The artifact interaction methods are available directly on instances of `CallbackContext` (passed to agent and model callbacks) and `ToolContext` (passed to tool callbacks). Remember that `ToolContext` inherits from `CallbackContext`.

*   **Code Example:**

    === "Python"

        ```python
        import google.genai.types as types
        from google.adk.agents.callback_context import CallbackContext # Or ToolContext

        async def save_generated_report_py(context: CallbackContext, report_bytes: bytes):
            """Saves generated PDF report bytes as an artifact."""
            report_artifact = types.Part.from_data(
                data=report_bytes,
                mime_type="application/pdf"
            )
            filename = "generated_report.pdf"

            try:
                version = await context.save_artifact(filename=filename, artifact=report_artifact)
                print(f"Successfully saved Python artifact '{filename}' as version {version}.")
                # The event generated after this callback will contain:
                # event.actions.artifact_delta == {"generated_report.pdf": version}
            except ValueError as e:
                print(f"Error saving Python artifact: {e}. Is ArtifactService configured in Runner?")
            except Exception as e:
                # Handle potential storage errors (e.g., GCS permissions)
                print(f"An unexpected error occurred during Python artifact save: {e}")

        # --- Example Usage Concept (Python) ---
        # async def main_py():
        #   callback_context: CallbackContext = ... # obtain context
        #   report_data = b'...' # Assume this holds the PDF bytes
        #   await save_generated_report_py(callback_context, report_data)
        ```

    === "Java"
    
        ```java
        import com.google.adk.agents.CallbackContext;
        import com.google.adk.artifacts.BaseArtifactService;
        import com.google.adk.artifacts.InMemoryArtifactService;
        import com.google.genai.types.Part;
        import java.nio.charset.StandardCharsets;

        public class SaveArtifactExample {

        public void saveGeneratedReport(CallbackContext callbackContext, byte[] reportBytes) {
        // Saves generated PDF report bytes as an artifact.
        Part reportArtifact = Part.fromBytes(reportBytes, "application/pdf");
        String filename = "generatedReport.pdf";

            callbackContext.saveArtifact(filename, reportArtifact);
            System.out.println("Successfully saved Java artifact '" + filename);
            // The event generated after this callback will contain:
            // event().actions().artifactDelta == {"generated_report.pdf": version}
        }

        // --- Example Usage Concept (Java) ---
        public static void main(String[] args) {
            BaseArtifactService service = new InMemoryArtifactService(); // Or GcsArtifactService
            SaveArtifactExample myTool = new SaveArtifactExample();
            byte[] reportData = "...".getBytes(StandardCharsets.UTF_8); // PDF bytes
            CallbackContext callbackContext; // ... obtain callback context from your app
            myTool.saveGeneratedReport(callbackContext, reportData);
            // Due to async nature, in a real app, ensure program waits or handles completion.
          }
        }
        ```

#### Loading Artifacts

*   **Code Example:**

    === "Python"

        ```python
        import google.genai.types as types
        from google.adk.agents.callback_context import CallbackContext # Or ToolContext

        async def process_latest_report_py(context: CallbackContext):
            """Loads the latest report artifact and processes its data."""
            filename = "generated_report.pdf"
            try:
                # Load the latest version
                report_artifact = await context.load_artifact(filename=filename)

                if report_artifact and report_artifact.inline_data:
                    print(f"Successfully loaded latest Python artifact '{filename}'.")
                    print(f"MIME Type: {report_artifact.inline_data.mime_type}")
                    # Process the report_artifact.inline_data.data (bytes)
                    pdf_bytes = report_artifact.inline_data.data
                    print(f"Report size: {len(pdf_bytes)} bytes.")
                    # ... further processing ...
                else:
                    print(f"Python artifact '{filename}' not found.")

                # Example: Load a specific version (if version 0 exists)
                # specific_version_artifact = await context.load_artifact(filename=filename, version=0)
                # if specific_version_artifact:
                #     print(f"Loaded version 0 of '{filename}'.")

            except ValueError as e:
                print(f"Error loading Python artifact: {e}. Is ArtifactService configured?")
            except Exception as e:
                # Handle potential storage errors
                print(f"An unexpected error occurred during Python artifact load: {e}")

        # --- Example Usage Concept (Python) ---
        # async def main_py():
        #   callback_context: CallbackContext = ... # obtain context
        #   await process_latest_report_py(callback_context)
        ```

    === "Java"

        ```java
        import com.google.adk.artifacts.BaseArtifactService;
        import com.google.genai.types.Part;
        import io.reactivex.rxjava3.core.MaybeObserver;
        import io.reactivex.rxjava3.disposables.Disposable;
        import java.util.Optional;

        public class MyArtifactLoaderService {

            private final BaseArtifactService artifactService;
            private final String appName;

            public MyArtifactLoaderService(BaseArtifactService artifactService, String appName) {
                this.artifactService = artifactService;
                this.appName = appName;
            }

            public void processLatestReportJava(String userId, String sessionId, String filename) {
                // Load the latest version by passing Optional.empty() for the version
                artifactService
                        .loadArtifact(appName, userId, sessionId, filename, Optional.empty())
                        .subscribe(
                                new MaybeObserver<Part>() {
                                    @Override
                                    public void onSubscribe(Disposable d) {
                                        // Optional: handle subscription
                                    }

                                    @Override
                                    public void onSuccess(Part reportArtifact) {
                                        System.out.println(
                                                "Successfully loaded latest Java artifact '" + filename + "'.");
                                        reportArtifact
                                                .inlineData()
                                                .ifPresent(
                                                        blob -> {
                                                            System.out.println(
                                                                    "MIME Type: " + blob.mimeType().orElse("N/A"));
                                                            byte[] pdfBytes = blob.data().orElse(new byte[0]);
                                                            System.out.println("Report size: " + pdfBytes.length + " bytes.");
                                                            // ... further processing of pdfBytes ...
                                                        });
                                    }

                                    @Override
                                    public void onError(Throwable e) {
                                        // Handle potential storage errors or other exceptions
                                        System.err.println(
                                                "An error occurred during Java artifact load for '"
                                                        + filename
                                                        + "': "
                                                        + e.getMessage());
                                    }

                                    @Override
                                    public void onComplete() {
                                        // Called if the artifact (latest version) is not found
                                        System.out.println("Java artifact '" + filename + "' not found.");
                                    }
                                });

                // Example: Load a specific version (e.g., version 0)
                /*
                artifactService.loadArtifact(appName, userId, sessionId, filename, Optional.of(0))
                    .subscribe(part -> {
                        System.out.println("Loaded version 0 of Java artifact '" + filename + "'.");
                    }, throwable -> {
                        System.err.println("Error loading version 0 of '" + filename + "': " + throwable.getMessage());
                    }, () -> {
                        System.out.println("Version 0 of Java artifact '" + filename + "' not found.");
                    });
                */
            }

            // --- Example Usage Concept (Java) ---
            public static void main(String[] args) {
                // BaseArtifactService service = new InMemoryArtifactService(); // Or GcsArtifactService
                // MyArtifactLoaderService loader = new MyArtifactLoaderService(service, "myJavaApp");
                // loader.processLatestReportJava("user123", "sessionABC", "java_report.pdf");
                // Due to async nature, in a real app, ensure program waits or handles completion.
            }
        }
        ```

#### Listing Artifact Filenames

*   **Code Example:**

    === "Python"

        ```python
        from google.adk.tools.tool_context import ToolContext

        def list_user_files_py(tool_context: ToolContext) -> str:
            """Tool to list available artifacts for the user."""
            try:
                available_files = await tool_context.list_artifacts()
                if not available_files:
                    return "You have no saved artifacts."
                else:
                    # Format the list for the user/LLM
                    file_list_str = "\n".join([f"- {fname}" for fname in available_files])
                    return f"Here are your available Python artifacts:\n{file_list_str}"
            except ValueError as e:
                print(f"Error listing Python artifacts: {e}. Is ArtifactService configured?")
                return "Error: Could not list Python artifacts."
            except Exception as e:
                print(f"An unexpected error occurred during Python artifact list: {e}")
                return "Error: An unexpected error occurred while listing Python artifacts."

        # This function would typically be wrapped in a FunctionTool
        # from google.adk.tools import FunctionTool
        # list_files_tool = FunctionTool(func=list_user_files_py)
        ```

    === "Java"

        ```java
        import com.google.adk.artifacts.BaseArtifactService;
        import com.google.adk.artifacts.ListArtifactsResponse;
        import com.google.common.collect.ImmutableList;
        import io.reactivex.rxjava3.core.SingleObserver;
        import io.reactivex.rxjava3.disposables.Disposable;

        public class MyArtifactListerService {

            private final BaseArtifactService artifactService;
            private final String appName;

            public MyArtifactListerService(BaseArtifactService artifactService, String appName) {
                this.artifactService = artifactService;
                this.appName = appName;
            }

            // Example method that might be called by a tool or agent logic
            public void listUserFilesJava(String userId, String sessionId) {
                artifactService
                        .listArtifactKeys(appName, userId, sessionId)
                        .subscribe(
                                new SingleObserver<ListArtifactsResponse>() {
                                    @Override
                                    public void onSubscribe(Disposable d) {
                                        // Optional: handle subscription
                                    }

                                    @Override
                                    public void onSuccess(ListArtifactsResponse response) {
                                        ImmutableList<String> availableFiles = response.filenames();
                                        if (availableFiles.isEmpty()) {
                                            System.out.println(
                                                    "User "
                                                            + userId
                                                            + " in session "
                                                            + sessionId
                                                            + " has no saved Java artifacts.");
                                        } else {
                                            StringBuilder fileListStr =
                                                    new StringBuilder(
                                                            "Here are the available Java artifacts for user "
                                                                    + userId
                                                                    + " in session "
                                                                    + sessionId
                                                                    + ":\n");
                                            for (String fname : availableFiles) {
                                                fileListStr.append("- ").append(fname).append("\n");
                                            }
                                            System.out.println(fileListStr.toString());
                                        }
                                    }

                                    @Override
                                    public void onError(Throwable e) {
                                        System.err.println(
                                                "Error listing Java artifacts for user "
                                                        + userId
                                                        + " in session "
                                                        + sessionId
                                                        + ": "
                                                        + e.getMessage());
                                        // In a real application, you might return an error message to the user/LLM
                                    }
                                });
            }

            // --- Example Usage Concept (Java) ---
            public static void main(String[] args) {
                // BaseArtifactService service = new InMemoryArtifactService(); // Or GcsArtifactService
                // MyArtifactListerService lister = new MyArtifactListerService(service, "myJavaApp");
                // lister.listUserFilesJava("user123", "sessionABC");
                // Due to async nature, in a real app, ensure program waits or handles completion.
            }
        }
        ```

These methods for saving, loading, and listing provide a convenient and consistent way to manage binary data persistence within ADK, whether using Python's context objects or directly interacting with the `BaseArtifactService` in Java, regardless of the chosen backend storage implementation.

## Available Implementations

ADK provides concrete implementations of the `BaseArtifactService` interface, offering different storage backends suitable for various development stages and deployment needs. These implementations handle the details of storing, versioning, and retrieving artifact data based on the `app_name`, `user_id`, `session_id`, and `filename` (including the `user:` namespace prefix).

### InMemoryArtifactService

*   **Storage Mechanism:**
    *   Python: Uses a Python dictionary (`self.artifacts`) held in the application's memory. The dictionary keys represent the artifact path, and the values are lists of `types.Part`, where each list element is a version.
    *   Java: Uses nested `HashMap` instances (`private final Map<String, Map<String, Map<String, Map<String, List<Part>>>>> artifacts;`) held in memory. The keys at each level are `appName`, `userId`, `sessionId`, and `filename` respectively. The innermost `List<Part>` stores the versions of the artifact, where the list index corresponds to the version number.
*   **Key Features:**
    *   **Simplicity:** Requires no external setup or dependencies beyond the core ADK library.
    *   **Speed:** Operations are typically very fast as they involve in-memory map/dictionary lookups and list manipulations.
    *   **Ephemeral:** All stored artifacts are **lost** when the application process terminates. Data does not persist between application restarts.
*   **Use Cases:**
    *   Ideal for local development and testing where persistence is not required.
    *   Suitable for short-lived demonstrations or scenarios where artifact data is purely temporary within a single run of the application.
*   **Instantiation:**

    === "Python"

        ```python
        from google.adk.artifacts import InMemoryArtifactService

        # Simply instantiate the class
        in_memory_service_py = InMemoryArtifactService()

        # Then pass it to the Runner
        # runner = Runner(..., artifact_service=in_memory_service_py)
        ```

    === "Java"

        ```java
        import com.google.adk.artifacts.BaseArtifactService;
        import com.google.adk.artifacts.InMemoryArtifactService;

        public class InMemoryServiceSetup {
            public static void main(String[] args) {
                // Simply instantiate the class
                BaseArtifactService inMemoryServiceJava = new InMemoryArtifactService();

                System.out.println("InMemoryArtifactService (Java) instantiated: " + inMemoryServiceJava.getClass().getName());

                // This instance would then be provided to your Runner.
                // Runner runner = new Runner(
                //     /* other services */,
                //     inMemoryServiceJava
                // );
            }
        }
        ```

### GcsArtifactService


*   **Storage Mechanism:** Leverages Google Cloud Storage (GCS) for persistent artifact storage. Each version of an artifact is stored as a separate object (blob) within a specified GCS bucket.
*   **Object Naming Convention:** It constructs GCS object names (blob names) using a hierarchical path structure.
*   **Key Features:**
    *   **Persistence:** Artifacts stored in GCS persist across application restarts and deployments.
    *   **Scalability:** Leverages the scalability and durability of Google Cloud Storage.
    *   **Versioning:** Explicitly stores each version as a distinct GCS object. The `saveArtifact` method in `GcsArtifactService`.
    *   **Permissions Required:** The application environment needs appropriate credentials (e.g., Application Default Credentials) and IAM permissions to read from and write to the specified GCS bucket.
*   **Use Cases:**
    *   Production environments requiring persistent artifact storage.
    *   Scenarios where artifacts need to be shared across different application instances or services (by accessing the same GCS bucket).
    *   Applications needing long-term storage and retrieval of user or session data.
*   **Instantiation:**

    === "Python"

        ```python
        from google.adk.artifacts import GcsArtifactService

        # Specify the GCS bucket name
        gcs_bucket_name_py = "your-gcs-bucket-for-adk-artifacts" # Replace with your bucket name

        try:
            gcs_service_py = GcsArtifactService(bucket_name=gcs_bucket_name_py)
            print(f"Python GcsArtifactService initialized for bucket: {gcs_bucket_name_py}")
            # Ensure your environment has credentials to access this bucket.
            # e.g., via Application Default Credentials (ADC)

            # Then pass it to the Runner
            # runner = Runner(..., artifact_service=gcs_service_py)

        except Exception as e:
            # Catch potential errors during GCS client initialization (e.g., auth issues)
            print(f"Error initializing Python GcsArtifactService: {e}")
            # Handle the error appropriately - maybe fall back to InMemory or raise
        ```

    === "Java"

        ```java
        --8<-- "examples/java/snippets/src/main/java/artifacts/GcsServiceSetup.java:full_code"
        ```

Choosing the appropriate `ArtifactService` implementation depends on your application's requirements for data persistence, scalability, and operational environment.

## Best Practices

To use artifacts effectively and maintainably:

* **Choose the Right Service:** Use `InMemoryArtifactService` for rapid prototyping, testing, and scenarios where persistence isn't needed. Use `GcsArtifactService` (or implement your own `BaseArtifactService` for other backends) for production environments requiring data persistence and scalability.  
* **Meaningful Filenames:** Use clear, descriptive filenames. Including relevant extensions (`.pdf`, `.png`, `.wav`) helps humans understand the content, even though the `mime_type` dictates programmatic handling. Establish conventions for temporary vs. persistent artifact names.  
* **Specify Correct MIME Types:** Always provide an accurate `mime_type` when creating the `types.Part` for `save_artifact`. This is critical for applications or tools that later `load_artifact` to interpret the `bytes` data correctly. Use standard IANA MIME types where possible.  
* **Understand Versioning:** Remember that `load_artifact()` without a specific `version` argument retrieves the *latest* version. If your logic depends on a specific historical version of an artifact, be sure to provide the integer version number when loading.  
* **Use Namespacing (`user:`) Deliberately:** Only use the `"user:"` prefix for filenames when the data truly belongs to the user and should be accessible across all their sessions. For data specific to a single conversation or session, use regular filenames without the prefix.  
* **Error Handling:**  
    * Always check if an `artifact_service` is actually configured before calling context methods (`save_artifact`, `load_artifact`, `list_artifacts`) – they will raise a `ValueError` if the service is `None`. 
    * Check the return value of `load_artifact`, as it will be `None` if the artifact or version doesn't exist. Don't assume it always returns a `Part`.  
    * Be prepared to handle exceptions from the underlying storage service, especially with `GcsArtifactService` (e.g., `google.api_core.exceptions.Forbidden` for permission issues, `NotFound` if the bucket doesn't exist, network errors).  
* **Size Considerations:** Artifacts are suitable for typical file sizes, but be mindful of potential costs and performance impacts with extremely large files, especially with cloud storage. `InMemoryArtifactService` can consume significant memory if storing many large artifacts. Evaluate if very large data might be better handled through direct GCS links or other specialized storage solutions rather than passing entire byte arrays in-memory.  
* **Cleanup Strategy:** For persistent storage like `GcsArtifactService`, artifacts remain until explicitly deleted. If artifacts represent temporary data or have a limited lifespan, implement a strategy for cleanup. This might involve:  
    * Using GCS lifecycle policies on the bucket.  
    * Building specific tools or administrative functions that utilize the `artifact_service.delete_artifact` method (note: delete is *not* exposed via context objects for safety).  
    * Carefully managing filenames to allow pattern-based deletion if needed.


Directory structure:
└── events/
    └── index.md

================================================
FILE: docs/events/index.md
================================================
# Events

Events are the fundamental units of information flow within the Agent Development Kit (ADK). They represent every significant occurrence during an agent's interaction lifecycle, from initial user input to the final response and all the steps in between. Understanding events is crucial because they are the primary way components communicate, state is managed, and control flow is directed.

## What Events Are and Why They Matter

An `Event` in ADK is an immutable record representing a specific point in the agent's execution. It captures user messages, agent replies, requests to use tools (function calls), tool results, state changes, control signals, and errors.

=== "Python"
    Technically, it's an instance of the `google.adk.events.Event` class, which builds upon the basic `LlmResponse` structure by adding essential ADK-specific metadata and an `actions` payload.

    ```python
    # Conceptual Structure of an Event (Python)
    # from google.adk.events import Event, EventActions
    # from google.genai import types

    # class Event(LlmResponse): # Simplified view
    #     # --- LlmResponse fields ---
    #     content: Optional[types.Content]
    #     partial: Optional[bool]
    #     # ... other response fields ...

    #     # --- ADK specific additions ---
    #     author: str          # 'user' or agent name
    #     invocation_id: str   # ID for the whole interaction run
    #     id: str              # Unique ID for this specific event
    #     timestamp: float     # Creation time
    #     actions: EventActions # Important for side-effects & control
    #     branch: Optional[str] # Hierarchy path
    #     # ...
    ```

=== "Java"
    In Java, this is an instance of the `com.google.adk.events.Event` class. It also builds upon a basic response structure by adding essential ADK-specific metadata and an `actions` payload.

    ```java
    // Conceptual Structure of an Event (Java - See com.google.adk.events.Event.java)
    // Simplified view based on the provided com.google.adk.events.Event.java
    // public class Event extends JsonBaseModel {
    //     // --- Fields analogous to LlmResponse ---
    //     private Optional<Content> content;
    //     private Optional<Boolean> partial;
    //     // ... other response fields like errorCode, errorMessage ...

    //     // --- ADK specific additions ---
    //     private String author;         // 'user' or agent name
    //     private String invocationId;   // ID for the whole interaction run
    //     private String id;             // Unique ID for this specific event
    //     private long timestamp;        // Creation time (epoch milliseconds)
    //     private EventActions actions;  // Important for side-effects & control
    //     private Optional<String> branch; // Hierarchy path
    //     // ... other fields like turnComplete, longRunningToolIds etc.
    // }
    ```

Events are central to ADK's operation for several key reasons:

1.  **Communication:** They serve as the standard message format between the user interface, the `Runner`, agents, the LLM, and tools. Everything flows as an `Event`.

2.  **Signaling State & Artifact Changes:** Events carry instructions for state modifications and track artifact updates. The `SessionService` uses these signals to ensure persistence. In Python changes are signaled via `event.actions.state_delta` and `event.actions.artifact_delta`.

3.  **Control Flow:** Specific fields like `event.actions.transfer_to_agent` or `event.actions.escalate` act as signals that direct the framework, determining which agent runs next or if a loop should terminate.

4.  **History & Observability:** The sequence of events recorded in `session.events` provides a complete, chronological history of an interaction, invaluable for debugging, auditing, and understanding agent behavior step-by-step.

In essence, the entire process, from a user's query to the agent's final answer, is orchestrated through the generation, interpretation, and processing of `Event` objects.


## Understanding and Using Events

As a developer, you'll primarily interact with the stream of events yielded by the `Runner`. Here's how to understand and extract information from them:

!!! Note
    The specific parameters or method names for the primitives may vary slightly by SDK language (e.g., `event.content()` in Python, `event.content().get().parts()` in Java). Refer to the language-specific API documentation for details.

### Identifying Event Origin and Type

Quickly determine what an event represents by checking:

*   **Who sent it? (`event.author`)**
    *   `'user'`: Indicates input directly from the end-user.
    *   `'AgentName'`: Indicates output or action from a specific agent (e.g., `'WeatherAgent'`, `'SummarizerAgent'`).
*   **What's the main payload? (`event.content` and `event.content.parts`)**
    *   **Text:** Indicates a conversational message. For Python, check if `event.content.parts[0].text` exists. For Java, check if `event.content()` is present, its `parts()` are present and not empty, and the first part's `text()` is present.
    *   **Tool Call Request:** Check `event.get_function_calls()`. If not empty, the LLM is asking to execute one or more tools. Each item in the list has `.name` and `.args`.
    *   **Tool Result:** Check `event.get_function_responses()`. If not empty, this event carries the result(s) from tool execution(s). Each item has `.name` and `.response` (the dictionary returned by the tool). *Note:* For history structuring, the `role` inside the `content` is often `'user'`, but the event `author` is typically the agent that requested the tool call.

*   **Is it streaming output? (`event.partial`)**
    Indicates whether this is an incomplete chunk of text from the LLM.
    *   `True`: More text will follow.
    *   `False` or `None`/`Optional.empty()`: This part of the content is complete (though the overall turn might not be finished if `turn_complete` is also false).

=== "Python"
    ```python
    # Pseudocode: Basic event identification (Python)
    # async for event in runner.run_async(...):
    #     print(f"Event from: {event.author}")
    #
    #     if event.content and event.content.parts:
    #         if event.get_function_calls():
    #             print("  Type: Tool Call Request")
    #         elif event.get_function_responses():
    #             print("  Type: Tool Result")
    #         elif event.content.parts[0].text:
    #             if event.partial:
    #                 print("  Type: Streaming Text Chunk")
    #             else:
    #                 print("  Type: Complete Text Message")
    #         else:
    #             print("  Type: Other Content (e.g., code result)")
    #     elif event.actions and (event.actions.state_delta or event.actions.artifact_delta):
    #         print("  Type: State/Artifact Update")
    #     else:
    #         print("  Type: Control Signal or Other")
    ```

=== "Java"
    ```java
    // Pseudocode: Basic event identification (Java)
    // import com.google.genai.types.Content;
    // import com.google.adk.events.Event;
    // import com.google.adk.events.EventActions;

    // runner.runAsync(...).forEach(event -> { // Assuming a synchronous stream or reactive stream
    //     System.out.println("Event from: " + event.author());
    //
    //     if (event.content().isPresent()) {
    //         Content content = event.content().get();
    //         if (!event.functionCalls().isEmpty()) {
    //             System.out.println("  Type: Tool Call Request");
    //         } else if (!event.functionResponses().isEmpty()) {
    //             System.out.println("  Type: Tool Result");
    //         } else if (content.parts().isPresent() && !content.parts().get().isEmpty() &&
    //                    content.parts().get().get(0).text().isPresent()) {
    //             if (event.partial().orElse(false)) {
    //                 System.out.println("  Type: Streaming Text Chunk");
    //             } else {
    //                 System.out.println("  Type: Complete Text Message");
    //             }
    //         } else {
    //             System.out.println("  Type: Other Content (e.g., code result)");
    //         }
    //     } else if (event.actions() != null &&
    //                ((event.actions().stateDelta() != null && !event.actions().stateDelta().isEmpty()) ||
    //                 (event.actions().artifactDelta() != null && !event.actions().artifactDelta().isEmpty()))) {
    //         System.out.println("  Type: State/Artifact Update");
    //     } else {
    //         System.out.println("  Type: Control Signal or Other");
    //     }
    // });
    ```

### Extracting Key Information

Once you know the event type, access the relevant data:

*   **Text Content:**
    Always check for the presence of content and parts before accessing text. In Python its `text = event.content.parts[0].text`.

*   **Function Call Details:**
    
    === "Python"
        ```python
        calls = event.get_function_calls()
        if calls:
            for call in calls:
                tool_name = call.name
                arguments = call.args # This is usually a dictionary
                print(f"  Tool: {tool_name}, Args: {arguments}")
                # Application might dispatch execution based on this
        ```
    === "Java"

        ```java
        import com.google.genai.types.FunctionCall;
        import com.google.common.collect.ImmutableList;
        import java.util.Map;
    
        ImmutableList<FunctionCall> calls = event.functionCalls(); // from Event.java
        if (!calls.isEmpty()) {
          for (FunctionCall call : calls) {
            String toolName = call.name().get();
            // args is Optional<Map<String, Object>>
            Map<String, Object> arguments = call.args().get();
                   System.out.println("  Tool: " + toolName + ", Args: " + arguments);
            // Application might dispatch execution based on this
          }
        }
        ```

*   **Function Response Details:**
    
    === "Python"
        ```python
        responses = event.get_function_responses()
        if responses:
            for response in responses:
                tool_name = response.name
                result_dict = response.response # The dictionary returned by the tool
                print(f"  Tool Result: {tool_name} -> {result_dict}")
        ```
    === "Java"

        ```java
        import com.google.genai.types.FunctionResponse;
        import com.google.common.collect.ImmutableList;
        import java.util.Map; 

        ImmutableList<FunctionResponse> responses = event.functionResponses(); // from Event.java
        if (!responses.isEmpty()) {
            for (FunctionResponse response : responses) {
                String toolName = response.name().get();
                Map<String, String> result= response.response().get(); // Check before getting the response
                System.out.println("  Tool Result: " + toolName + " -> " + result);
            }
        }
        ```

*   **Identifiers:**
    *   `event.id`: Unique ID for this specific event instance.
    *   `event.invocation_id`: ID for the entire user-request-to-final-response cycle this event belongs to. Useful for logging and tracing.

### Detecting Actions and Side Effects

The `event.actions` object signals changes that occurred or should occur. Always check if `event.actions` and it's fields/ methods exists before accessing them.

*   **State Changes:** Gives you a collection of key-value pairs that were modified in the session state during the step that produced this event.
    
    === "Python"
        `delta = event.actions.state_delta` (a dictionary of `{key: value}` pairs).
        ```python
        if event.actions and event.actions.state_delta:
            print(f"  State changes: {event.actions.state_delta}")
            # Update local UI or application state if necessary
        ```
    === "Java"
        `ConcurrentMap<String, Object> delta = event.actions().stateDelta();`

        ```java
        import java.util.concurrent.ConcurrentMap;
        import com.google.adk.events.EventActions;

        EventActions actions = event.actions(); // Assuming event.actions() is not null
        if (actions != null && actions.stateDelta() != null && !actions.stateDelta().isEmpty()) {
            ConcurrentMap<String, Object> stateChanges = actions.stateDelta();
            System.out.println("  State changes: " + stateChanges);
            // Update local UI or application state if necessary
        }
        ```

*   **Artifact Saves:** Gives you a collection indicating which artifacts were saved and their new version number (or relevant `Part` information).
    
    === "Python"
        `artifact_changes = event.actions.artifact_delta` (a dictionary of `{filename: version}`).
        ```python
        if event.actions and event.actions.artifact_delta:
            print(f"  Artifacts saved: {event.actions.artifact_delta}")
            # UI might refresh an artifact list
        ```
    === "Java"
        `ConcurrentMap<String, Part> artifactChanges = event.actions().artifactDelta();`
        
        ```java
        import java.util.concurrent.ConcurrentMap;
        import com.google.genai.types.Part;
        import com.google.adk.events.EventActions;

        EventActions actions = event.actions(); // Assuming event.actions() is not null
        if (actions != null && actions.artifactDelta() != null && !actions.artifactDelta().isEmpty()) {
            ConcurrentMap<String, Part> artifactChanges = actions.artifactDelta();
            System.out.println("  Artifacts saved: " + artifactChanges);
            // UI might refresh an artifact list
            // Iterate through artifactChanges.entrySet() to get filename and Part details
        }
        ```

*   **Control Flow Signals:** Check boolean flags or string values:
    
    === "Python"
        *   `event.actions.transfer_to_agent` (string): Control should pass to the named agent.
        *   `event.actions.escalate` (bool): A loop should terminate.
        *   `event.actions.skip_summarization` (bool): A tool result should not be summarized by the LLM.
        ```python
        if event.actions:
            if event.actions.transfer_to_agent:
                print(f"  Signal: Transfer to {event.actions.transfer_to_agent}")
            if event.actions.escalate:
                print("  Signal: Escalate (terminate loop)")
            if event.actions.skip_summarization:
                print("  Signal: Skip summarization for tool result")
        ```
    === "Java"
        *   `event.actions().transferToAgent()` (returns `Optional<String>`): Control should pass to the named agent.
        *   `event.actions().escalate()` (returns `Optional<Boolean>`): A loop should terminate.
        *   `event.actions().skipSummarization()` (returns `Optional<Boolean>`): A tool result should not be summarized by the LLM.

        ```java
        import com.google.adk.events.EventActions;
        import java.util.Optional;

        EventActions actions = event.actions(); // Assuming event.actions() is not null
        if (actions != null) {
            Optional<String> transferAgent = actions.transferToAgent();
            if (transferAgent.isPresent()) {
                System.out.println("  Signal: Transfer to " + transferAgent.get());
            }

            Optional<Boolean> escalate = actions.escalate();
            if (escalate.orElse(false)) { // or escalate.isPresent() && escalate.get()
                System.out.println("  Signal: Escalate (terminate loop)");
            }

            Optional<Boolean> skipSummarization = actions.skipSummarization();
            if (skipSummarization.orElse(false)) { // or skipSummarization.isPresent() && skipSummarization.get()
                System.out.println("  Signal: Skip summarization for tool result");
            }
        }
        ```

### Determining if an Event is a "Final" Response

Use the built-in helper method `event.is_final_response()` to identify events suitable for display as the agent's complete output for a turn.

*   **Purpose:** Filters out intermediate steps (like tool calls, partial streaming text, internal state updates) from the final user-facing message(s).
*   **When `True`?**
    1.  The event contains a tool result (`function_response`) and `skip_summarization` is `True`.
    2.  The event contains a tool call (`function_call`) for a tool marked as `is_long_running=True`. In Java, check if the `longRunningToolIds` list is empty: 
        *   `event.longRunningToolIds().isPresent() && !event.longRunningToolIds().get().isEmpty()` is `true`.
    3.  OR, **all** of the following are met:
        *   No function calls (`get_function_calls()` is empty).
        *   No function responses (`get_function_responses()` is empty).
        *   Not a partial stream chunk (`partial` is not `True`).
        *   Doesn't end with a code execution result that might need further processing/display.
*   **Usage:** Filter the event stream in your application logic.

    === "Python"
        ```python
        # Pseudocode: Handling final responses in application (Python)
        # full_response_text = ""
        # async for event in runner.run_async(...):
        #     # Accumulate streaming text if needed...
        #     if event.partial and event.content and event.content.parts and event.content.parts[0].text:
        #         full_response_text += event.content.parts[0].text
        #
        #     # Check if it's a final, displayable event
        #     if event.is_final_response():
        #         print("\n--- Final Output Detected ---")
        #         if event.content and event.content.parts and event.content.parts[0].text:
        #              # If it's the final part of a stream, use accumulated text
        #              final_text = full_response_text + (event.content.parts[0].text if not event.partial else "")
        #              print(f"Display to user: {final_text.strip()}")
        #              full_response_text = "" # Reset accumulator
        #         elif event.actions and event.actions.skip_summarization and event.get_function_responses():
        #              # Handle displaying the raw tool result if needed
        #              response_data = event.get_function_responses()[0].response
        #              print(f"Display raw tool result: {response_data}")
        #         elif hasattr(event, 'long_running_tool_ids') and event.long_running_tool_ids:
        #              print("Display message: Tool is running in background...")
        #         else:
        #              # Handle other types of final responses if applicable
        #              print("Display: Final non-textual response or signal.")
        ```
    === "Java"
        ```java
        // Pseudocode: Handling final responses in application (Java)
        import com.google.adk.events.Event;
        import com.google.genai.types.Content;
        import com.google.genai.types.FunctionResponse;
        import java.util.Map;

        StringBuilder fullResponseText = new StringBuilder();
        runner.run(...).forEach(event -> { // Assuming a stream of events
             // Accumulate streaming text if needed...
             if (event.partial().orElse(false) && event.content().isPresent()) {
                 event.content().flatMap(Content::parts).ifPresent(parts -> {
                     if (!parts.isEmpty() && parts.get(0).text().isPresent()) {
                         fullResponseText.append(parts.get(0).text().get());
                    }
                 });
             }
        
             // Check if it's a final, displayable event
             if (event.finalResponse()) { // Using the method from Event.java
                 System.out.println("\n--- Final Output Detected ---");
                 if (event.content().isPresent() &&
                     event.content().flatMap(Content::parts).map(parts -> !parts.isEmpty() && parts.get(0).text().isPresent()).orElse(false)) {
                     // If it's the final part of a stream, use accumulated text
                     String eventText = event.content().get().parts().get().get(0).text().get();
                     String finalText = fullResponseText.toString() + (event.partial().orElse(false) ? "" : eventText);
                     System.out.println("Display to user: " + finalText.trim());
                     fullResponseText.setLength(0); // Reset accumulator
                 } else if (event.actions() != null && event.actions().skipSummarization().orElse(false)
                            && !event.functionResponses().isEmpty()) {
                     // Handle displaying the raw tool result if needed,
                     // especially if finalResponse() was true due to other conditions
                     // or if you want to display skipped summarization results regardless of finalResponse()
                     Map<String, Object> responseData = event.functionResponses().get(0).response().get();
                     System.out.println("Display raw tool result: " + responseData);
                 } else if (event.longRunningToolIds().isPresent() && !event.longRunningToolIds().get().isEmpty()) {
                     // This case is covered by event.finalResponse()
                     System.out.println("Display message: Tool is running in background...");
                 } else {
                     // Handle other types of final responses if applicable
                     System.out.println("Display: Final non-textual response or signal.");
                 }
             }
         });
        ```

By carefully examining these aspects of an event, you can build robust applications that react appropriately to the rich information flowing through the ADK system.

## How Events Flow: Generation and Processing

Events are created at different points and processed systematically by the framework. Understanding this flow helps clarify how actions and history are managed.

*   **Generation Sources:**
    *   **User Input:** The `Runner` typically wraps initial user messages or mid-conversation inputs into an `Event` with `author='user'`.
    *   **Agent Logic:** Agents (`BaseAgent`, `LlmAgent`) explicitly `yield Event(...)` objects (setting `author=self.name`) to communicate responses or signal actions.
    *   **LLM Responses:** The ADK model integration layer translates raw LLM output (text, function calls, errors) into `Event` objects, authored by the calling agent.
    *   **Tool Results:** After a tool executes, the framework generates an `Event` containing the `function_response`. The `author` is typically the agent that requested the tool, while the `role` inside the `content` is set to `'user'` for the LLM history.


*   **Processing Flow:**
    1.  **Yield/Return:** An event is generated and yielded (Python) or returned/emitted (Java) by its source.
    2.  **Runner Receives:** The main `Runner` executing the agent receives the event.
    3.  **SessionService Processing:** The `Runner` sends the event to the configured `SessionService`. This is a critical step:
        *   **Applies Deltas:** The service merges `event.actions.state_delta` into `session.state` and updates internal records based on `event.actions.artifact_delta`. (Note: The actual artifact *saving* usually happened earlier when `context.save_artifact` was called).
        *   **Finalizes Metadata:** Assigns a unique `event.id` if not present, may update `event.timestamp`.
        *   **Persists to History:** Appends the processed event to the `session.events` list.
    4.  **External Yield:** The `Runner` yields (Python) or returns/emits (Java) the processed event outwards to the calling application (e.g., the code that invoked `runner.run_async`).

This flow ensures that state changes and history are consistently recorded alongside the communication content of each event.


## Common Event Examples (Illustrative Patterns)

Here are concise examples of typical events you might see in the stream:

*   **User Input:**
    ```json
    {
      "author": "user",
      "invocation_id": "e-xyz...",
      "content": {"parts": [{"text": "Book a flight to London for next Tuesday"}]}
      // actions usually empty
    }
    ```
*   **Agent Final Text Response:** (`is_final_response() == True`)
    ```json
    {
      "author": "TravelAgent",
      "invocation_id": "e-xyz...",
      "content": {"parts": [{"text": "Okay, I can help with that. Could you confirm the departure city?"}]},
      "partial": false,
      "turn_complete": true
      // actions might have state delta, etc.
    }
    ```
*   **Agent Streaming Text Response:** (`is_final_response() == False`)
    ```json
    {
      "author": "SummaryAgent",
      "invocation_id": "e-abc...",
      "content": {"parts": [{"text": "The document discusses three main points:"}]},
      "partial": true,
      "turn_complete": false
    }
    // ... more partial=True events follow ...
    ```
*   **Tool Call Request (by LLM):** (`is_final_response() == False`)
    ```json
    {
      "author": "TravelAgent",
      "invocation_id": "e-xyz...",
      "content": {"parts": [{"function_call": {"name": "find_airports", "args": {"city": "London"}}}]}
      // actions usually empty
    }
    ```
*   **Tool Result Provided (to LLM):** (`is_final_response()` depends on `skip_summarization`)
    ```json
    {
      "author": "TravelAgent", // Author is agent that requested the call
      "invocation_id": "e-xyz...",
      "content": {
        "role": "user", // Role for LLM history
        "parts": [{"function_response": {"name": "find_airports", "response": {"result": ["LHR", "LGW", "STN"]}}}]
      }
      // actions might have skip_summarization=True
    }
    ```
*   **State/Artifact Update Only:** (`is_final_response() == False`)
    ```json
    {
      "author": "InternalUpdater",
      "invocation_id": "e-def...",
      "content": null,
      "actions": {
        "state_delta": {"user_status": "verified"},
        "artifact_delta": {"verification_doc.pdf": 2}
      }
    }
    ```
*   **Agent Transfer Signal:** (`is_final_response() == False`)
    ```json
    {
      "author": "OrchestratorAgent",
      "invocation_id": "e-789...",
      "content": {"parts": [{"function_call": {"name": "transfer_to_agent", "args": {"agent_name": "BillingAgent"}}}]},
      "actions": {"transfer_to_agent": "BillingAgent"} // Added by framework
    }
    ```
*   **Loop Escalation Signal:** (`is_final_response() == False`)
    ```json
    {
      "author": "CheckerAgent",
      "invocation_id": "e-loop...",
      "content": {"parts": [{"text": "Maximum retries reached."}]}, // Optional content
      "actions": {"escalate": true}
    }
    ```

## Additional Context and Event Details

Beyond the core concepts, here are a few specific details about context and events that are important for certain use cases:

1.  **`ToolContext.function_call_id` (Linking Tool Actions):**
    *   When an LLM requests a tool (FunctionCall), that request has an ID. The `ToolContext` provided to your tool function includes this `function_call_id`.
    *   **Importance:** This ID is crucial for linking actions like authentication back to the specific tool request that initiated them, especially if multiple tools are called in one turn. The framework uses this ID internally.

2.  **How State/Artifact Changes are Recorded:**
    *   When you modify state or save an artifact using `CallbackContext` or `ToolContext`, these changes aren't immediately written to persistent storage.
    *   Instead, they populate the `state_delta` and `artifact_delta` fields within the `EventActions` object.
    *   This `EventActions` object is attached to the *next event* generated after the change (e.g., the agent's response or a tool result event).
    *   The `SessionService.append_event` method reads these deltas from the incoming event and applies them to the session's persistent state and artifact records. This ensures changes are tied chronologically to the event stream.

3.  **State Scope Prefixes (`app:`, `user:`, `temp:`):**
    *   When managing state via `context.state`, you can optionally use prefixes:
        *   `app:my_setting`: Suggests state relevant to the entire application (requires a persistent `SessionService`).
        *   `user:user_preference`: Suggests state relevant to the specific user across sessions (requires a persistent `SessionService`).
        *   `temp:intermediate_result` or no prefix: Typically session-specific or temporary state for the current invocation.
    *   The underlying `SessionService` determines how these prefixes are handled for persistence.

4.  **Error Events:**
    *   An `Event` can represent an error. Check the `event.error_code` and `event.error_message` fields (inherited from `LlmResponse`).
    *   Errors might originate from the LLM (e.g., safety filters, resource limits) or potentially be packaged by the framework if a tool fails critically. Check tool `FunctionResponse` content for typical tool-specific errors.
    ```json
    // Example Error Event (conceptual)
    {
      "author": "LLMAgent",
      "invocation_id": "e-err...",
      "content": null,
      "error_code": "SAFETY_FILTER_TRIGGERED",
      "error_message": "Response blocked due to safety settings.",
      "actions": {}
    }
    ```

These details provide a more complete picture for advanced use cases involving tool authentication, state persistence scope, and error handling within the event stream.

## Best Practices for Working with Events

To use events effectively in your ADK applications:

*   **Clear Authorship:** When building custom agents, ensure correct attribution for agent actions in the history. The framework generally handles authorship correctly for LLM/tool events.
    
    === "Python"
        Use `yield Event(author=self.name, ...)` in `BaseAgent` subclasses.
    === "Java"
        When constructing an `Event` in your custom agent logic, set the author, for example: `Event.builder().author(this.getAgentName()) // ... .build();`

*   **Semantic Content & Actions:** Use `event.content` for the core message/data (text, function call/response). Use `event.actions` specifically for signaling side effects (state/artifact deltas) or control flow (`transfer`, `escalate`, `skip_summarization`).
*   **Idempotency Awareness:** Understand that the `SessionService` is responsible for applying the state/artifact changes signaled in `event.actions`. While ADK services aim for consistency, consider potential downstream effects if your application logic re-processes events.
*   **Use `is_final_response()`:** Rely on this helper method in your application/UI layer to identify complete, user-facing text responses. Avoid manually replicating its logic.
*   **Leverage History:** The session's event list is your primary debugging tool. Examine the sequence of authors, content, and actions to trace execution and diagnose issues.
*   **Use Metadata:** Use `invocation_id` to correlate all events within a single user interaction. Use `event.id` to reference specific, unique occurrences.

Treating events as structured messages with clear purposes for their content and actions is key to building, debugging, and managing complex agent behaviors in ADK.

Directory structure:
└── context/
    └── index.md

================================================
FILE: docs/context/index.md
================================================
# Context

## What are Context

In the Agent Development Kit (ADK), "context" refers to the crucial bundle of information available to your agent and its tools during specific operations. Think of it as the necessary background knowledge and resources needed to handle a current task or conversation turn effectively.

Agents often need more than just the latest user message to perform well. Context is essential because it enables:

1. **Maintaining State:** Remembering details across multiple steps in a conversation (e.g., user preferences, previous calculations, items in a shopping cart). This is primarily managed through **session state**.
2. **Passing Data:** Sharing information discovered or generated in one step (like an LLM call or a tool execution) with subsequent steps. Session state is key here too.
3. **Accessing Services:** Interacting with framework capabilities like:
    * **Artifact Storage:** Saving or loading files or data blobs (like PDFs, images, configuration files) associated with the session.
    * **Memory:** Searching for relevant information from past interactions or external knowledge sources connected to the user.
    * **Authentication:** Requesting and retrieving credentials needed by tools to access external APIs securely.
4. **Identity and Tracking:** Knowing which agent is currently running (`agent.name`) and uniquely identifying the current request-response cycle (`invocation_id`) for logging and debugging.
5. **Tool-Specific Actions:** Enabling specialized operations within tools, such as requesting authentication or searching memory, which require access to the current interaction's details.


The central piece holding all this information together for a single, complete user-request-to-final-response cycle (an **invocation**) is the `InvocationContext`. However, you typically won't create or manage this object directly. The ADK framework creates it when an invocation starts (e.g., via `runner.run_async`) and passes the relevant contextual information implicitly to your agent code, callbacks, and tools.

=== "Python"

    ```python
    # Conceptual Pseudocode: How the framework provides context (Internal Logic)
    
    # runner = Runner(agent=my_root_agent, session_service=..., artifact_service=...)
    # user_message = types.Content(...)
    # session = session_service.get_session(...) # Or create new
    
    # --- Inside runner.run_async(...) ---
    # 1. Framework creates the main context for this specific run
    # invocation_context = InvocationContext(
    #     invocation_id="unique-id-for-this-run",
    #     session=session,
    #     user_content=user_message,
    #     agent=my_root_agent, # The starting agent
    #     session_service=session_service,
    #     artifact_service=artifact_service,
    #     memory_service=memory_service,
    #     # ... other necessary fields ...
    # )
    #
    # 2. Framework calls the agent's run method, passing the context implicitly
    #    (The agent's method signature will receive it, e.g., runAsyncImpl(InvocationContext invocationContext))
    # await my_root_agent.run_async(invocation_context)
    #   --- End Internal Logic ---
    #
    # As a developer, you work with the context objects provided in method arguments.
    ```

=== "Java"

    ```java
    /* Conceptual Pseudocode: How the framework provides context (Internal Logic) */
    InMemoryRunner runner = new InMemoryRunner(agent);
    Session session = runner
        .sessionService()
        .createSession(runner.appName(), USER_ID, initialState, SESSION_ID )
        .blockingGet();

    try (Scanner scanner = new Scanner(System.in, StandardCharsets.UTF_8)) {
      while (true) {
        System.out.print("\nYou > ");
      }
      String userInput = scanner.nextLine();
      if ("quit".equalsIgnoreCase(userInput)) {
        break;
      }
      Content userMsg = Content.fromParts(Part.fromText(userInput));
      Flowable<Event> events = runner.runAsync(session.userId(), session.id(), userMsg);
      System.out.print("\nAgent > ");
      events.blockingForEach(event -> System.out.print(event.stringifyContent()));
    }
    ```

## The Different types of Context

While `InvocationContext` acts as the comprehensive internal container, ADK provides specialized context objects tailored to specific situations. This ensures you have the right tools and permissions for the task at hand without needing to handle the full complexity of the internal context everywhere. Here are the different "flavors" you'll encounter:

1.  **`InvocationContext`**
    *   **Where Used:** Received as the `ctx` argument directly within an agent's core implementation methods (`_run_async_impl`, `_run_live_impl`).
    *   **Purpose:** Provides access to the *entire* state of the current invocation. This is the most comprehensive context object.
    *   **Key Contents:** Direct access to `session` (including `state` and `events`), the current `agent` instance, `invocation_id`, initial `user_content`, references to configured services (`artifact_service`, `memory_service`, `session_service`), and fields related to live/streaming modes.
    *   **Use Case:** Primarily used when the agent's core logic needs direct access to the overall session or services, though often state and artifact interactions are delegated to callbacks/tools which use their own contexts. Also used to control the invocation itself (e.g., setting `ctx.end_invocation = True`).

    === "Python"
    
        ```python
        # Pseudocode: Agent implementation receiving InvocationContext
        from google.adk.agents import BaseAgent
        from google.adk.agents.invocation_context import InvocationContext
        from google.adk.events import Event
        from typing import AsyncGenerator
    
        class MyAgent(BaseAgent):
            async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:
                # Direct access example
                agent_name = ctx.agent.name
                session_id = ctx.session.id
                print(f"Agent {agent_name} running in session {session_id} for invocation {ctx.invocation_id}")
                # ... agent logic using ctx ...
                yield # ... event ...
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: Agent implementation receiving InvocationContext
        import com.google.adk.agents.BaseAgent;
        import com.google.adk.agents.InvocationContext;
        
            LlmAgent root_agent =
                LlmAgent.builder()
                    .model("gemini-***")
                    .name("sample_agent")
                    .description("Answers user questions.")
                    .instruction(
                        """
                        provide instruction for the agent here.
                        """
                    )
                    .tools(sampleTool)
                    .outputKey("YOUR_KEY")
                    .build();
    
            ConcurrentMap<String, Object> initialState = new ConcurrentHashMap<>();
            initialState.put("YOUR_KEY", "");
          
            InMemoryRunner runner = new InMemoryRunner(agent);
            Session session =
                  runner
                      .sessionService()
                      .createSession(runner.appName(), USER_ID, initialState, SESSION_ID )
                      .blockingGet();
    
           try (Scanner scanner = new Scanner(System.in, StandardCharsets.UTF_8)) {
                while (true) {
                  System.out.print("\nYou > ");
                  String userInput = scanner.nextLine();
        
                  if ("quit".equalsIgnoreCase(userInput)) {
                    break;
                  }
                  
                  Content userMsg = Content.fromParts(Part.fromText(userInput));
                  Flowable<Event> events = 
                          runner.runAsync(session.userId(), session.id(), userMsg);
        
                  System.out.print("\nAgent > ");
                  events.blockingForEach(event -> 
                          System.out.print(event.stringifyContent()));
              }
        
            protected Flowable<Event> runAsyncImpl(InvocationContext invocationContext) {
                // Direct access example
                String agentName = invocationContext.agent.name
                String sessionId = invocationContext.session.id
                String invocationId = invocationContext.invocationId
                System.out.println("Agent " + agent_name + " running in session " + session_id + " for invocation " + invocationId)
                // ... agent logic using ctx ...
            }
        ```

2.  **`ReadonlyContext`**
    *   **Where Used:** Provided in scenarios where only read access to basic information is needed and mutation is disallowed (e.g., `InstructionProvider` functions). It's also the base class for other contexts.
    *   **Purpose:** Offers a safe, read-only view of fundamental contextual details.
    *   **Key Contents:** `invocation_id`, `agent_name`, and a read-only *view* of the current `state`.

    === "Python"
    
        ```python
        # Pseudocode: Instruction provider receiving ReadonlyContext
        from google.adk.agents import ReadonlyContext
    
        def my_instruction_provider(context: ReadonlyContext) -> str:
            # Read-only access example
            user_tier = context.state().get("user_tier", "standard") # Can read state
            # context.state['new_key'] = 'value' # This would typically cause an error or be ineffective
            return f"Process the request for a {user_tier} user."
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: Instruction provider receiving ReadonlyContext
        import com.google.adk.agents.ReadonlyContext;
    
        public String myInstructionProvider(ReadonlyContext context){
            // Read-only access example
            String userTier = context.state().get("user_tier", "standard");
            context.state().put('new_key', 'value'); //This would typically cause an error
            return "Process the request for a " + userTier + " user."
        }
        ```
    
3.  **`CallbackContext`**
    *   **Where Used:** Passed as `callback_context` to agent lifecycle callbacks (`before_agent_callback`, `after_agent_callback`) and model interaction callbacks (`before_model_callback`, `after_model_callback`).
    *   **Purpose:** Facilitates inspecting and modifying state, interacting with artifacts, and accessing invocation details *specifically within callbacks*.
    *   **Key Capabilities (Adds to `ReadonlyContext`):**
        *   **Mutable `state` Property:** Allows reading *and writing* to session state. Changes made here (`callback_context.state['key'] = value`) are tracked and associated with the event generated by the framework after the callback.
        *   **Artifact Methods:** `load_artifact(filename)` and `save_artifact(filename, part)` methods for interacting with the configured `artifact_service`.
        *   Direct `user_content` access.

    === "Python"
    
        ```python
        # Pseudocode: Callback receiving CallbackContext
        from google.adk.agents.callback_context import CallbackContext
        from google.adk.models import LlmRequest
        from google.genai import types
        from typing import Optional
    
        def my_before_model_cb(callback_context: CallbackContext, request: LlmRequest) -> Optional[types.Content]:
            # Read/Write state example
            call_count = callback_context.state.get("model_calls", 0)
            callback_context.state["model_calls"] = call_count + 1 # Modify state
    
            # Optionally load an artifact
            # config_part = callback_context.load_artifact("model_config.json")
            print(f"Preparing model call #{call_count + 1} for invocation {callback_context.invocation_id}")
            return None # Allow model call to proceed
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: Callback receiving CallbackContext
        import com.google.adk.agents.CallbackContext;
        import com.google.adk.models.LlmRequest;
        import com.google.genai.types.Content;
        import java.util.Optional;
    
        public Maybe<LlmResponse> myBeforeModelCb(CallbackContext callbackContext, LlmRequest request){
            // Read/Write state example
            callCount = callbackContext.state().get("model_calls", 0)
            callbackContext.state().put("model_calls") = callCount + 1 # Modify state
    
            // Optionally load an artifact
            // Maybe<Part> configPart = callbackContext.loadArtifact("model_config.json");
            System.out.println("Preparing model call " + callCount + 1);
            return Maybe.empty(); // Allow model call to proceed
        }
        ```

4.  **`ToolContext`**
    *   **Where Used:** Passed as `tool_context` to the functions backing `FunctionTool`s and to tool execution callbacks (`before_tool_callback`, `after_tool_callback`).
    *   **Purpose:** Provides everything `CallbackContext` does, plus specialized methods essential for tool execution, like handling authentication, searching memory, and listing artifacts.
    *   **Key Capabilities (Adds to `CallbackContext`):**
        *   **Authentication Methods:** `request_credential(auth_config)` to trigger an auth flow, and `get_auth_response(auth_config)` to retrieve credentials provided by the user/system.
        *   **Artifact Listing:** `list_artifacts()` to discover available artifacts in the session.
        *   **Memory Search:** `search_memory(query)` to query the configured `memory_service`.
        *   **`function_call_id` Property:** Identifies the specific function call from the LLM that triggered this tool execution, crucial for linking authentication requests or responses back correctly.
        *   **`actions` Property:** Direct access to the `EventActions` object for this step, allowing the tool to signal state changes, auth requests, etc.

    === "Python"
    
        ```python
        # Pseudocode: Tool function receiving ToolContext
        from google.adk.tools import ToolContext
        from typing import Dict, Any
    
        # Assume this function is wrapped by a FunctionTool
        def search_external_api(query: str, tool_context: ToolContext) -> Dict[str, Any]:
            api_key = tool_context.state.get("api_key")
            if not api_key:
                # Define required auth config
                # auth_config = AuthConfig(...)
                # tool_context.request_credential(auth_config) # Request credentials
                # Use the 'actions' property to signal the auth request has been made
                # tool_context.actions.requested_auth_configs[tool_context.function_call_id] = auth_config
                return {"status": "Auth Required"}
    
            # Use the API key...
            print(f"Tool executing for query '{query}' using API key. Invocation: {tool_context.invocation_id}")
    
            # Optionally search memory or list artifacts
            # relevant_docs = tool_context.search_memory(f"info related to {query}")
            # available_files = tool_context.list_artifacts()
    
            return {"result": f"Data for {query} fetched."}
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: Tool function receiving ToolContext
        import com.google.adk.tools.ToolContext;
        import java.util.HashMap;
        import java.util.Map;
    
        // Assume this function is wrapped by a FunctionTool
        public Map<String, Object> searchExternalApi(String query, ToolContext toolContext){
            String apiKey = toolContext.state.get("api_key");
            if(apiKey.isEmpty()){
                // Define required auth config
                // authConfig = AuthConfig(...);
                // toolContext.requestCredential(authConfig); # Request credentials
                // Use the 'actions' property to signal the auth request has been made
                ...
                return Map.of("status", "Auth Required");
    
            // Use the API key...
            System.out.println("Tool executing for query " + query + " using API key. ");
    
            // Optionally list artifacts
            // Single<List<String>> availableFiles = toolContext.listArtifacts();
    
            return Map.of("result", "Data for " + query + " fetched");
        }
        ```

Understanding these different context objects and when to use them is key to effectively managing state, accessing services, and controlling the flow of your ADK application. The next section will detail common tasks you can perform using these contexts.


## Common Tasks Using Context

Now that you understand the different context objects, let's focus on how to use them for common tasks when building your agents and tools.

### Accessing Information

You'll frequently need to read information stored within the context.

*   **Reading Session State:** Access data saved in previous steps or user/app-level settings. Use dictionary-like access on the `state` property.

    === "Python"
    
        ```python
        # Pseudocode: In a Tool function
        from google.adk.tools import ToolContext
    
        def my_tool(tool_context: ToolContext, **kwargs):
            user_pref = tool_context.state.get("user_display_preference", "default_mode")
            api_endpoint = tool_context.state.get("app:api_endpoint") # Read app-level state
    
            if user_pref == "dark_mode":
                # ... apply dark mode logic ...
                pass
            print(f"Using API endpoint: {api_endpoint}")
            # ... rest of tool logic ...
    
        # Pseudocode: In a Callback function
        from google.adk.agents.callback_context import CallbackContext
    
        def my_callback(callback_context: CallbackContext, **kwargs):
            last_tool_result = callback_context.state.get("temp:last_api_result") # Read temporary state
            if last_tool_result:
                print(f"Found temporary result from last tool: {last_tool_result}")
            # ... callback logic ...
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: In a Tool function
        import com.google.adk.tools.ToolContext;
    
        public void myTool(ToolContext toolContext){
           String userPref = toolContext.state().get("user_display_preference");
           String apiEndpoint = toolContext.state().get("app:api_endpoint"); // Read app-level state
           if(userPref.equals("dark_mode")){
                // ... apply dark mode logic ...
                pass
            }
           System.out.println("Using API endpoint: " + api_endpoint);
           // ... rest of tool logic ...
        }
    
    
        // Pseudocode: In a Callback function
        import com.google.adk.agents.CallbackContext;
    
            public void myCallback(CallbackContext callbackContext){
                String lastToolResult = (String) callbackContext.state().get("temp:last_api_result"); // Read temporary state
            }
            if(!(lastToolResult.isEmpty())){
                System.out.println("Found temporary result from last tool: " + lastToolResult);
            }
            // ... callback logic ...
        ```

*   **Getting Current Identifiers:** Useful for logging or custom logic based on the current operation.

    === "Python"
    
        ```python
        # Pseudocode: In any context (ToolContext shown)
        from google.adk.tools import ToolContext
    
        def log_tool_usage(tool_context: ToolContext, **kwargs):
            agent_name = tool_context.agent_nameSystem.out.println("Found temporary result from last tool: " + lastToolResult);
            inv_id = tool_context.invocation_id
            func_call_id = getattr(tool_context, 'function_call_id', 'N/A') # Specific to ToolContext
    
            print(f"Log: Invocation={inv_id}, Agent={agent_name}, FunctionCallID={func_call_id} - Tool Executed.")
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: In any context (ToolContext shown)
         import com.google.adk.tools.ToolContext;
    
         public void logToolUsage(ToolContext toolContext){
                    String agentName = toolContext.agentName;
                    String invId = toolContext.invocationId;
                    String functionCallId = toolContext.functionCallId().get(); // Specific to ToolContext
                    System.out.println("Log: Invocation= " + invId &+ " Agent= " + agentName);
                }
        ```

*   **Accessing the Initial User Input:** Refer back to the message that started the current invocation.

    === "Python"
    
        ```python
        # Pseudocode: In a Callback
        from google.adk.agents.callback_context import CallbackContext
    
        def check_initial_intent(callback_context: CallbackContext, **kwargs):
            initial_text = "N/A"
            if callback_context.user_content and callback_context.user_content.parts:
                initial_text = callback_context.user_content.parts[0].text or "Non-text input"
    
            print(f"This invocation started with user input: '{initial_text}'")
    
        # Pseudocode: In an Agent's _run_async_impl
        # async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:
        #     if ctx.user_content and ctx.user_content.parts:
        #         initial_text = ctx.user_content.parts[0].text
        #         print(f"Agent logic remembering initial query: {initial_text}")
        #     ...
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: In a Callback
        import com.google.adk.agents.CallbackContext;
    
        public void checkInitialIntent(CallbackContext callbackContext){
            String initialText = "N/A";
            if((!(callbackContext.userContent().isEmpty())) && (!(callbackContext.userContent().parts.isEmpty()))){
                initialText = cbx.userContent().get().parts().get().get(0).text().get();
                ...
                System.out.println("This invocation started with user input: " + initialText)
            }
        }
        ```
    
### Managing Session State

State is crucial for memory and data flow. When you modify state using `CallbackContext` or `ToolContext`, the changes are automatically tracked and persisted by the framework.

*   **How it Works:** Writing to `callback_context.state['my_key'] = my_value` or `tool_context.state['my_key'] = my_value` adds this change to the `EventActions.state_delta` associated with the current step's event. The `SessionService` then applies these deltas when persisting the event.
*   **Passing Data Between Tools:**

    === "Python"
    
        ```python
        # Pseudocode: Tool 1 - Fetches user ID
        from google.adk.tools import ToolContext
        import uuid
    
        def get_user_profile(tool_context: ToolContext) -> dict:
            user_id = str(uuid.uuid4()) # Simulate fetching ID
            # Save the ID to state for the next tool
            tool_context.state["temp:current_user_id"] = user_id
            return {"profile_status": "ID generated"}
    
        # Pseudocode: Tool 2 - Uses user ID from state
        def get_user_orders(tool_context: ToolContext) -> dict:
            user_id = tool_context.state.get("temp:current_user_id")
            if not user_id:
                return {"error": "User ID not found in state"}
    
            print(f"Fetching orders for user ID: {user_id}")
            # ... logic to fetch orders using user_id ...
            return {"orders": ["order123", "order456"]}
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: Tool 1 - Fetches user ID
        import com.google.adk.tools.ToolContext;
        import java.util.UUID;
    
        public Map<String, String> getUserProfile(ToolContext toolContext){
            String userId = UUID.randomUUID().toString();
            // Save the ID to state for the next tool
            toolContext.state().put("temp:current_user_id", user_id);
            return Map.of("profile_status", "ID generated");
        }
    
        // Pseudocode: Tool 2 - Uses user ID from state
        public  Map<String, String> getUserOrders(ToolContext toolContext){
            String userId = toolContext.state().get("temp:current_user_id");
            if(userId.isEmpty()){
                return Map.of("error", "User ID not found in state");
            }
            System.out.println("Fetching orders for user id: " + userId);
             // ... logic to fetch orders using user_id ...
            return Map.of("orders", "order123");
        }
        ```

*   **Updating User Preferences:**

    === "Python"
    
        ```python
        # Pseudocode: Tool or Callback identifies a preference
        from google.adk.tools import ToolContext # Or CallbackContext
    
        def set_user_preference(tool_context: ToolContext, preference: str, value: str) -> dict:
            # Use 'user:' prefix for user-level state (if using a persistent SessionService)
            state_key = f"user:{preference}"
            tool_context.state[state_key] = value
            print(f"Set user preference '{preference}' to '{value}'")
            return {"status": "Preference updated"}
        ```
    
    === "Java"
    
        ```java
        // Pseudocode: Tool or Callback identifies a preference
        import com.google.adk.tools.ToolContext; // Or CallbackContext
    
        public Map<String, String> setUserPreference(ToolContext toolContext, String preference, String value){
            // Use 'user:' prefix for user-level state (if using a persistent SessionService)
            String stateKey = "user:" + preference;
            toolContext.state().put(stateKey, value);
            System.out.println("Set user preference '" + preference + "' to '" + value + "'");
            return Map.of("status", "Preference updated");
        }
        ```

*   **State Prefixes:** While basic state is session-specific, prefixes like `app:` and `user:` can be used with persistent `SessionService` implementations (like `DatabaseSessionService` or `VertexAiSessionService`) to indicate broader scope (app-wide or user-wide across sessions). `temp:` can denote data only relevant within the current invocation.

### Working with Artifacts

Use artifacts to handle files or large data blobs associated with the session. Common use case: processing uploaded documents.

*   **Document Summarizer Example Flow:**

    1.  **Ingest Reference (e.g., in a Setup Tool or Callback):** Save the *path or URI* of the document, not the entire content, as an artifact.

        === "Python"
    
               ```python
               # Pseudocode: In a callback or initial tool
               from google.adk.agents import CallbackContext # Or ToolContext
               from google.genai import types
                
               def save_document_reference(context: CallbackContext, file_path: str) -> None:
                   # Assume file_path is something like "gs://my-bucket/docs/report.pdf" or "/local/path/to/report.pdf"
                   try:
                       # Create a Part containing the path/URI text
                       artifact_part = types.Part(text=file_path)
                       version = context.save_artifact("document_to_summarize.txt", artifact_part)
                       print(f"Saved document reference '{file_path}' as artifact version {version}")
                       # Store the filename in state if needed by other tools
                       context.state["temp:doc_artifact_name"] = "document_to_summarize.txt"
                   except ValueError as e:
                       print(f"Error saving artifact: {e}") # E.g., Artifact service not configured
                   except Exception as e:
                       print(f"Unexpected error saving artifact reference: {e}")
                
               # Example usage:
               # save_document_reference(callback_context, "gs://my-bucket/docs/report.pdf")
               ```
    
        === "Java"
    
               ```java
               // Pseudocode: In a callback or initial tool
               import com.google.adk.agents.CallbackContext;
               import com.google.genai.types.Content;
               import com.google.genai.types.Part;
                
                
               pubic void saveDocumentReference(CallbackContext context, String filePath){
                   // Assume file_path is something like "gs://my-bucket/docs/report.pdf" or "/local/path/to/report.pdf"
                   try{
                       // Create a Part containing the path/URI text
                       Part artifactPart = types.Part(filePath)
                       Optional<Integer> version = context.saveArtifact("document_to_summarize.txt", artifactPart)
                       System.out.println("Saved document reference" + filePath + " as artifact version " + version);
                       // Store the filename in state if needed by other tools
                       context.state().put("temp:doc_artifact_name", "document_to_summarize.txt");
                   } catch(Exception e){
                       System.out.println("Unexpected error saving artifact reference: " + e);
                   }
               }
                    
               // Example usage:
               // saveDocumentReference(context, "gs://my-bucket/docs/report.pdf")
               ```

    2.  **Summarizer Tool:** Load the artifact to get the path/URI, read the actual document content using appropriate libraries, summarize, and return the result.

        === "Python"

            ```python
            # Pseudocode: In the Summarizer tool function
            from google.adk.tools import ToolContext
            from google.genai import types
            # Assume libraries like google.cloud.storage or built-in open are available
            # Assume a 'summarize_text' function exists
            # from my_summarizer_lib import summarize_text

            def summarize_document_tool(tool_context: ToolContext) -> dict:
                artifact_name = tool_context.state.get("temp:doc_artifact_name")
                if not artifact_name:
                    return {"error": "Document artifact name not found in state."}

                try:
                    # 1. Load the artifact part containing the path/URI
                    artifact_part = tool_context.load_artifact(artifact_name)
                    if not artifact_part or not artifact_part.text:
                        return {"error": f"Could not load artifact or artifact has no text path: {artifact_name}"}

                    file_path = artifact_part.text
                    print(f"Loaded document reference: {file_path}")

                    # 2. Read the actual document content (outside ADK context)
                    document_content = ""
                    if file_path.startswith("gs://"):
                        # Example: Use GCS client library to download/read
                        # from google.cloud import storage
                        # client = storage.Client()
                        # blob = storage.Blob.from_string(file_path, client=client)
                        # document_content = blob.download_as_text() # Or bytes depending on format
                        pass # Replace with actual GCS reading logic
                    elif file_path.startswith("/"):
                         # Example: Use local file system
                         with open(file_path, 'r', encoding='utf-8') as f:
                             document_content = f.read()
                    else:
                        return {"error": f"Unsupported file path scheme: {file_path}"}

                    # 3. Summarize the content
                    if not document_content:
                         return {"error": "Failed to read document content."}

                    # summary = summarize_text(document_content) # Call your summarization logic
                    summary = f"Summary of content from {file_path}" # Placeholder

                    return {"summary": summary}

                except ValueError as e:
                     return {"error": f"Artifact service error: {e}"}
                except FileNotFoundError:
                     return {"error": f"Local file not found: {file_path}"}
                # except Exception as e: # Catch specific exceptions for GCS etc.
                #      return {"error": f"Error reading document {file_path}: {e}"}
            ```

        === "Java"

            ```java
            // Pseudocode: In the Summarizer tool function
            import com.google.adk.tools.ToolContext;
            import com.google.genai.types.Content;
            import com.google.genai.types.Part;

            public Map<String, String> summarizeDocumentTool(ToolContext toolContext){
                String artifactName = toolContext.state().get("temp:doc_artifact_name");
                if(artifactName.isEmpty()){
                    return Map.of("error", "Document artifact name not found in state.");
                }
                try{
                    // 1. Load the artifact part containing the path/URI
                    Maybe<Part> artifactPart = toolContext.loadArtifact(artifactName);
                    if((artifactPart == null) || (artifactPart.text().isEmpty())){
                        return Map.of("error", "Could not load artifact or artifact has no text path: " + artifactName);
                    }
                    filePath = artifactPart.text();
                    System.out.println("Loaded document reference: " + filePath);

                    // 2. Read the actual document content (outside ADK context)
                    String documentContent = "";
                    if(filePath.startsWith("gs://")){
                        // Example: Use GCS client library to download/read into documentContent
                        pass; // Replace with actual GCS reading logic
                    } else if(){
                        // Example: Use local file system to download/read into documentContent
                    } else{
                        return Map.of("error", "Unsupported file path scheme: " + filePath); 
                    }

                    // 3. Summarize the content
                    if(documentContent.isEmpty()){
                        return Map.of("error", "Failed to read document content."); 
                    }

                    // summary = summarizeText(documentContent) // Call your summarization logic
                    summary = "Summary of content from " + filePath; // Placeholder

                    return Map.of("summary", summary);
                } catch(IllegalArgumentException e){
                    return Map.of("error", "Artifact service error " + filePath + e);
                } catch(FileNotFoundException e){
                    return Map.of("error", "Local file not found " + filePath + e);
                } catch(Exception e){
                    return Map.of("error", "Error reading document " + filePath + e);
                }
            }
            ```
    
*   **Listing Artifacts:** Discover what files are available.
    
    === "Python"
        
        ```python
        # Pseudocode: In a tool function
        from google.adk.tools import ToolContext
        
        def check_available_docs(tool_context: ToolContext) -> dict:
            try:
                artifact_keys = tool_context.list_artifacts()
                print(f"Available artifacts: {artifact_keys}")
                return {"available_docs": artifact_keys}
            except ValueError as e:
                return {"error": f"Artifact service error: {e}"}
        ```
        
    === "Java"
        
        ```java
        // Pseudocode: In a tool function
        import com.google.adk.tools.ToolContext;
        
        public Map<String, String> checkAvailableDocs(ToolContext toolContext){
            try{
                Single<List<String>> artifactKeys = toolContext.listArtifacts();
                System.out.println("Available artifacts" + artifactKeys.tostring());
                return Map.of("availableDocs", "artifactKeys");
            } catch(IllegalArgumentException e){
                return Map.of("error", "Artifact service error: " + e);
            }
        }
        ```

### Handling Tool Authentication 

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

Securely manage API keys or other credentials needed by tools.

```python
# Pseudocode: Tool requiring auth
from google.adk.tools import ToolContext
from google.adk.auth import AuthConfig # Assume appropriate AuthConfig is defined

# Define your required auth configuration (e.g., OAuth, API Key)
MY_API_AUTH_CONFIG = AuthConfig(...)
AUTH_STATE_KEY = "user:my_api_credential" # Key to store retrieved credential

def call_secure_api(tool_context: ToolContext, request_data: str) -> dict:
    # 1. Check if credential already exists in state
    credential = tool_context.state.get(AUTH_STATE_KEY)

    if not credential:
        # 2. If not, request it
        print("Credential not found, requesting...")
        try:
            tool_context.request_credential(MY_API_AUTH_CONFIG)
            # The framework handles yielding the event. The tool execution stops here for this turn.
            return {"status": "Authentication required. Please provide credentials."}
        except ValueError as e:
            return {"error": f"Auth error: {e}"} # e.g., function_call_id missing
        except Exception as e:
            return {"error": f"Failed to request credential: {e}"}

    # 3. If credential exists (might be from a previous turn after request)
    #    or if this is a subsequent call after auth flow completed externally
    try:
        # Optionally, re-validate/retrieve if needed, or use directly
        # This might retrieve the credential if the external flow just completed
        auth_credential_obj = tool_context.get_auth_response(MY_API_AUTH_CONFIG)
        api_key = auth_credential_obj.api_key # Or access_token, etc.

        # Store it back in state for future calls within the session
        tool_context.state[AUTH_STATE_KEY] = auth_credential_obj.model_dump() # Persist retrieved credential

        print(f"Using retrieved credential to call API with data: {request_data}")
        # ... Make the actual API call using api_key ...
        api_result = f"API result for {request_data}"

        return {"result": api_result}
    except Exception as e:
        # Handle errors retrieving/using the credential
        print(f"Error using credential: {e}")
        # Maybe clear the state key if credential is invalid?
        # tool_context.state[AUTH_STATE_KEY] = None
        return {"error": "Failed to use credential"}

```
*Remember: `request_credential` pauses the tool and signals the need for authentication. The user/system provides credentials, and on a subsequent call, `get_auth_response` (or checking state again) allows the tool to proceed.* The `tool_context.function_call_id` is used implicitly by the framework to link the request and response.

### Leveraging Memory 

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

Access relevant information from the past or external sources.

```python
# Pseudocode: Tool using memory search
from google.adk.tools import ToolContext

def find_related_info(tool_context: ToolContext, topic: str) -> dict:
    try:
        search_results = tool_context.search_memory(f"Information about {topic}")
        if search_results.results:
            print(f"Found {len(search_results.results)} memory results for '{topic}'")
            # Process search_results.results (which are SearchMemoryResponseEntry)
            top_result_text = search_results.results[0].text
            return {"memory_snippet": top_result_text}
        else:
            return {"message": "No relevant memories found."}
    except ValueError as e:
        return {"error": f"Memory service error: {e}"} # e.g., Service not configured
    except Exception as e:
        return {"error": f"Unexpected error searching memory: {e}"}
```

### Advanced: Direct `InvocationContext` Usage 

![python_only](https://img.shields.io/badge/Currently_supported_in-Python-blue){ title="This feature is currently available for Python. Java support is planned/ coming soon."}

While most interactions happen via `CallbackContext` or `ToolContext`, sometimes the agent's core logic (`_run_async_impl`/`_run_live_impl`) needs direct access.

```python
# Pseudocode: Inside agent's _run_async_impl
from google.adk.agents import BaseAgent
from google.adk.agents.invocation_context import InvocationContext
from google.adk.events import Event
from typing import AsyncGenerator

class MyControllingAgent(BaseAgent):
    async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:
        # Example: Check if a specific service is available
        if not ctx.memory_service:
            print("Memory service is not available for this invocation.")
            # Potentially change agent behavior

        # Example: Early termination based on some condition
        if ctx.session.state.get("critical_error_flag"):
            print("Critical error detected, ending invocation.")
            ctx.end_invocation = True # Signal framework to stop processing
            yield Event(author=self.name, invocation_id=ctx.invocation_id, content="Stopping due to critical error.")
            return # Stop this agent's execution

        # ... Normal agent processing ...
        yield # ... event ...
```

Setting `ctx.end_invocation = True` is a way to gracefully stop the entire request-response cycle from within the agent or its callbacks/tools (via their respective context objects which also have access to modify the underlying `InvocationContext`'s flag).

## Key Takeaways & Best Practices

*   **Use the Right Context:** Always use the most specific context object provided (`ToolContext` in tools/tool-callbacks, `CallbackContext` in agent/model-callbacks, `ReadonlyContext` where applicable). Use the full `InvocationContext` (`ctx`) directly in `_run_async_impl` / `_run_live_impl` only when necessary.
*   **State for Data Flow:** `context.state` is the primary way to share data, remember preferences, and manage conversational memory *within* an invocation. Use prefixes (`app:`, `user:`, `temp:`) thoughtfully when using persistent storage.
*   **Artifacts for Files:** Use `context.save_artifact` and `context.load_artifact` for managing file references (like paths or URIs) or larger data blobs. Store references, load content on demand.
*   **Tracked Changes:** Modifications to state or artifacts made via context methods are automatically linked to the current step's `EventActions` and handled by the `SessionService`.
*   **Start Simple:** Focus on `state` and basic artifact usage first. Explore authentication, memory, and advanced `InvocationContext` fields (like those for live streaming) as your needs become more complex.

By understanding and effectively using these context objects, you can build more sophisticated, stateful, and capable agents with ADK.


