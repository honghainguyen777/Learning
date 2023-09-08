# DevOps courses: DevOps Beginners to Advanced + 20 Real Time Projects
(Note: this is a personal note)
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

## Virtual Machine Setup
### Introduction
One computer can run multiple OS at the same time parallelly (does job of many computers).
- VMware brought in tools or created tools which could allow one computer to run multiple operating systems. These operating systems are isolated (in isolated environment). Each OS takes a partition of the physical resource of the physical machine. Each virtual machine needs its own OS.
- Server Virtualization is the most common virtualization beside virtualization like network, storage ones.

### Terminologies
- Host OS - The operating system of the physical machine.
- Guest OS - The operating system of the virtual machine.
- VM - Virtual Machine
- Snapshot - A way of taking backup of the virtual machine.
- Hypervisor - The tool or the software that let us do or create virtual machine

#### Types of Hypervisor
- Type 1 - Bare metal operating or a bare metal hypervisor. It runs directly on the physical computer. This is only for production and it won't let us use this computer for other purposes. Eg. VMware esxi, Xen Hypervisor. Type 1 hypervisor can be clustered together so we can distribute our virtual machines on the cluster. So if one of the hypervisors goes down, the other can take or run our virtual machines. Hyper-V from Microsoft is the type-1 hypervisor.
- Type 2 - Runs as a software which we can install on any computer for learning and testing purposes. Eg. Oracle virtualbox, vmware server.

### Setup VMs
Thumb Rule: If you want to automate something, make sure you know how to do it manually

#### Setup VMs manually
1. Prerequisites for windows
- Enable Virtualization in BIOS - the setting can be with different names such as VTx, Secure virtual machine, virtualization based on the hardware
- Disable other windows virtualization such as Microsoft HyperV, Windows Hypervisor platform, Windows Subsystem for linux, Docker Desktop, Virtual Machine Platform
- Sometimes the VMs do not get IP address, we may have to: Power off our computer -> Reboot the Router -> Power on our computer

2. Setup
- Open Oracle VM VirtualBox
- Create VM: click `New` -> enter a name -> Type `Linux` for Linux VM or `Ubuntu` for UbuntuVM -> Version `Red Hat (64-bit)` (linux) or `Ubuntu (64-bit)` for Ubuntu -> allocate memory and CPUs (1 CPU for Linux and 2 CPUs for Ubuntu)
- Install OS: search for an OS (CentOS or Almalinux 9 ([link](https://repo.almalinux.org/almalinux/9/isos/x86_64/) and download `AlmaLinux-9.2-x86_64-boot.iso` file) ISO file or [ubuntu-link](https://releases.ubuntu.com/jammy/)) -> in VirtualBox, select the newly created Linux VM -> Setting -> Storage -> Click on the `Empty` of the `Controller: IDE` -> find the dropdown of the Attributes/Optical Drive -> `Choose a disk file...` -> Select the newly downloaded ISO file -> Check the `Live CD/DVD` -> Go to the `Network` tab -> select `Adapter 2` -> `Enable Network Adapter` -> `Attached to: Bridged Adapter` -> Name of the LAN/Wireless Controller/Adapter -> OK -> `Start` the VM -> start the installation process. Note: for `ubuntu`, follow the default option of steps, but make sure to enable `SSH` in one of the step.
- Make sure to remove the installation ISO file
- Type `ip addr show` to get the bridge adapter IP address in the Linux terminal
- In the GitBash of the host machine, type `ssh <linux username>@<bridge adapter IP address>` to add the IP permanently to the list of host and login into the created Linux OS from the host machine (type `exit to exit`).

3. VM management problem
- OS installation that we need to go through while installing OS on a VM
- Time consuming
- Manual => Human Errors
- Tough to replicate multi VMs
- Need to document entire setup

#### Setup VMs automatically
##### Vagrant
- Vagrant is a VM automation tool. It manages/automates VMs lifecycle such as creating, making changes and cleaning up.
- It is not a replacement of any hypervisor like VMware or Oracle VM VirtualBox. It is on top of that.
- No OS installation because Vagrant uses VM Images/Boxes that are available on Vagrant cloud.
- Base on the VM boxes, we can create as many VMs as we want
- All VM settings will be in a filed called `Vagrantfile`. We can manage all VM settings in the file like RAM, CPU, IP addresses. We can also do provisioning (means when the OS is completely booted, we want to execute some commands on it like setting up some servers, web servers, database servers, or anything)
- Simple commands like `vagrant init <boxname>`, `vagrant up`, `vagrant ssh`, `vagrant halt`, `vagrant destroy`.

##### Vagrant Architecture
- Create a vagrant file -> run `vagrant up` -> Vagrant reads the `Vagrantfile` -> if the box is available in our local machine, it will take it, otherwise, it will download the image from Vagrant Cloud -> Contact the Hypervisor (Oracle Virtualbox/VMware working station etc...) and give the information of creating the VM -> the VM will be created.

##### Step to create VMs with Vagrant
- Create a folder in the physical computer
- Create a `Vagrantfile` in the created folder
- Issue the command `vagrant up`
- Use `vagrant ssh` to login into the VM
- Use `vagrant halt` to power off or `vagrant destroy` to delete the VM

##### Exercise
- Open `Git Bash` for Windows or Mac OS Terminal
- Create a folder in an appropriate path: `mkdir /f/Studies/DevOps/<folder name>`
- Enter the created folder: `cd /f/Studies/DevOps/<folder name>`
- Create VM folders: `mkdir centos`, `mkdir ubuntu`, etc.
- Enter a VM folder: `cd centos`
- Go to [Vagrant Cloud app](https://app.vagrantup.com/boxes/search) to get a box if we don't have. Exp. find [Centos](https://app.vagrantup.com/eurolinux-vagrant/boxes/centos-stream-9), copy the name (`eurolinux-vagrant/centos-stream-9`) or [Ubuntu Jammy](https://app.vagrantup.com/ubuntu/boxes/jammy64) for `ubuntu/jammy64`
- Enter to the VM folder GitBash (here `centos`), type `vagrant init eurolinux-vagrant/centos-stream-9`. To view the newly created  `Vagrantfile`, use `vat Vagrantfile`. If we realize that we got the wrong box after the file created, we can go to the line `config.vm.box = "eurolinux-vagrant/centos-stream-9"` to change the box name
- Run `vagrant up`. If we get an error like `Error: schannel: next InitializeSecurityContext`, make sure to disable the antivirus, disconnect VPN or if you are in a corporate network, make sure you are using some other internet and try again `vagrant up`
- We can run `vagrant box list` to see the downloaded boxes. `vagrant status` to check if any VM is running or not in the current folder or `vagrant global-status` for all running VMs. If you are using VirtualBox as the Supervisor, you can see the box is running when you open the Oracle VM VirtualBox Manager
- To login into the VM, we run `vagrant ssh`. We can use `sudo -i` to switch to the root user if we need to.
- use `vagrant halt` to power off the VM or `vagrant reload` to reboot the VM (Vagrant will look through the `Vagrantfile` to see if any changes and apply them. If we change the box name, we need to delete the VM using `vagrant destroy`)