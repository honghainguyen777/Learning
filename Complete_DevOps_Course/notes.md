# DevOps courses: DevOps Beginners to Advanced + 20 Real Time Projects

## Introduction
### Software Development Lifecycle (SDLC)
1. Requirement Gathering
2. Planning
3. Designing
4. Development
5. Testing
6. Deploying and Maintaining

#### Models in SDLC
- Waterfall
- Agile
- Spiral
- Big Bang
- etc.

### DevOps
- collaboration
- Communication
- Integration (automation)

### DevOps Lifecycle
1. Code - Developers commits code
2. Code Build - Deployable software: Artifact
3. Code Test - Unit and Integration test
4. Code Analysis - Vulnerability, best practices
5. Delivery - Deploy changes to staging
6. DB/Sec CHanges - Every other ops changes
7. Software Testing - QA/Functional, load, performance tests
8. Deploy to Prod
9. Go Live - User traffic diverted to new changes
10. User Approval - User Feedback
11. Keep Monitoring

### Continuous Integration
Continuous integration is a DevOps software development practice where developers regularly merge their code changes into a central repository, after which automated builds and tests are run.
- Continuous integration is an automated process in DevOps. Which generates software and its features quickly and efficiently
- Bad process: Developers write several lines of code while creating a software. It's an ideal practice to store all this code at a centralized place. The centralized repository is called a version control system like GitHub. Everyday developers will pull and push code such repositories several times in a day. Co code changes or code commit happens continuously. The code will be moved to build server. On the build server, the code will be built, tested, and evaluated -> generate the software (called it as artifact at this stage) -> The artifact will be stored in a software repository. Artifact is an archive of files generated from the build process. Based on the programming language, the artifact will be packaged in a specific format (WAR/JAR in Java, DLL/EXE/MSI in Windows or even ZIP/TAR) -> Shipped to servers for further testing -> once the testers approve, it can be shipped to production servers. -> The huge amount of code can cause many serious errors/problems -> A lot of reworks -> Code is merged but not integrated
- Solution: After every single commit from developers, the code should be built and tested automatically (automated process), so no waiting and collecting all these codes with bugs. As soon as the developers receives a failed notification, they will fix the code and commit it again -> if it's good, then the code can be versioned and stored in a software repository.
- Lifecycle: Code -> Fetch -> Build -> Test -> Notify -> Feedback -> Code -> ... called as Continuous Integration Process (CI)
- Goals of CI are to detect effects in the very early stage, so it does not multiply
#### Tools
- IDE (Atom, Eclipse, VSCode,...) for coding. IDE will be integrated with version control system (GIT, SVN, TFS, PERFORCE, ...)
- Build Tools based on the programming language
- Software Repository: to store artifacts
- CI Tools: JENKINS, CIRCLECI, TEAMCITY, BAMBOO CI, CRUISE CONTROL, ...

### Continuous Delivery
Continuous delivery is a software development practice where code changes are automatically prepared for a release to production
#### Deployment
- Server provisioning
- Dependencies
- Config changes
- Network
- Artifact deploying
- etc.

Ops team will be flooded with such requests as CI process will generate faster and regularly in a Agile SDLC -> too much of human intervention and manual approval -> All steps in deployment process need to be automated -> Continuous Delivery

#### Tools
- ANSIBLE, PUPPET, CHEF for system automation
- TERRAFORM, CFORMATION for cloud infrastructure
- JENKINS, OCTOPUS DEPLOY for CI/CD automation

#### Test automation
- Functional
- Load
- Performance
- Security
- DB
- Any other test cases

### Combination
- Ops teams will write automation code for deployment
- Testers will write automation code for software testing
- Sync the automation codes with developer's source code.

-> Integrate CI from DEV teams, automate deployment from Ops teams, and automate testing from QA teams

## Prerequisites Info and Setup
### Chocolatey for Windows
- This tool is used to install softwares through command line
- Installation: https://chocolatey.org/install
- After that, we can install packages we want: https://community.chocolatey.org/packages

### Homebrew for MacOS
- Installation: https://docs.brew.sh/Installation
- Search for packages: https://brew.sh/

### Required softwares
We can install one favorite editor or all
#### Windows
- Virtualbox: `choco install virtualbox -y`
- Vagrant: `choco install vagrant -y`
- Git: `choco install git -y` 
- Corretto11jdk: `choco install corretto11jdk -y` (windows)
- Maven: `choco install maven -y`
- AwsCLI: `choco install awscli -y`
- intellijidea-community: `choco install intellijidea-community -y` 
- VSCode: `choco install vscode -y`
- Sublime Text: `choco install sublimetext3.app -y`

#### MacOS (not for M1/M2)
- Execute commands: `echo -k > ~/.curlrc` and then `cat ~/.curlrc`
- Virtualbox: `brew install --cask virtualbox `
- Vagrant: `brew install --cask vagrant`
- Vagrant Manager: `brew install --cask vagrant-manager`
- Git: `brew install git`
- OpenJDK: `brew install openjdk` and then `sudo ln -sfn $HOMEBREW_PREFIX/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk`
- Maven: `brew install maven`
- AwsCLI: `brew install awscli`
- intellijidea-community: `brew install --cask intellij-idea`
- Intellijidea-ce: `brew install --cask intellij-idea-ce`
- VSCode: `brew install --cask visual-studio-code`
- Sublime Text: `brew install --cask sublime-text`

#### Ubuntu
- Virtualbox: `sudo apt update`, then `sudo apt install virtualbox`
- Vagrant: `curl -O https://releases.hashicorp.com/vagrant/2.2.9/vagrant_2.2.9_x86_64.deb` (or other newer/stable version), then `sudo apt install ./vagrant_2.2.9_x86_64.deb`
- Git: `apt install git`
- JDK: `sudo apt-get install openjdk-8-jdk` (or other stable version)
- Maven: `sudo apt-get install maven`
- awscli: `sudo apt-get install awscli`
- Intellij community: `sudo snap install intellij-idea-community --classic`
- Sublime Text: `sudo apt update`, then `sudo apt install dirmngr gnupg apt-transport-https ca-certificates software-properties-common`, then `curl -fsSL https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -`, then `sudo add-apt-repository "deb https://download.sublimetext.com/ apt/stable/"`, finally `sudo apt install sublime-text`

