# Git学习笔记

Git 是一个开源的版本控制系统，可以高效地处理任何或小或大的项目。

## 工作流程

- 工作流程

   可以把Git 的工作流程想象成一个写作业然后交给老师的过程 。

  ![工作流程](https://www.runoob.com/wp-content/uploads/2015/02/git-workflow-runoob-1770781044589.svg)

  1. 工作区就像是我们的书桌

     这是你实际修改文件的地方。你在这里写代码、删删改改。

     - eg：你在这里编写了新功能或修复了 Bug。

  2. 暂存区就像家里的文件夹或筐

     当你觉得作业写得差不多了，你会把它放进一个夹或筐里，准备打包。

     - 关键指令：`git add`
     - 意义：告诉 Git，这些改动我确认要提交了，先帮我收着。

  3. 本地仓库像是我们的柜子

     你把文件夹或筐里的东西打包好，贴上标签（提交信息），锁进自己的柜子。

     - 关键指令：`git commit`
     - 意义：改动正式成为了项目历史的一部分。即便你之后改乱了，也可以随时从这里找回。

  4. 远程仓库就像作业已经被老师收走了，并关到了柜子里（如 `GitHub`）

     你把柜子里的代码通过网络发送给远程服务器，方便其他人查看或合作。

     - 关键指令：`git push`
     - 意义：备份代码，并与团队共享进度。

  5. 知识点备注

     - `git stash (贮藏区)`：不想把没写完的代码提交。这时可以先用 `stash` 把代码藏进抽屉，等忙完再拿出来继续写（`pop`）。

     - `git pull (拉取)`：看看远程仓库那里有没有别人交的新作业，直接同步到你的书桌上。

     - `git fetch & merge`：先看看远程有什么更新（`fetch`），确认没问题后再合并（`merge`）到自己的代码里。

     - 流程总结：

       修改代码 → **`add`** (放进篮子) → **`commit`** (存入柜子) → **`push`** (寄给远方)。

- 命令说明

  1. 克隆仓库

     如果你要参与一个已有的项目，首先需要将远程仓库克隆到本地。

     ```
     git clone https://github.com/username/repo.git
     cd repo
     ```

  2. 创建新分支

     为了避免直接在 main 或 master 分支上进行开发，通常会创建一个新的分支。

     ```
     git checkout -b new-feature
     ```

  3. 工作目录

     在工作目录中进行代码编辑、添加新文件或删除不需要的文件。

  4. 暂存目录

     将修改过的文件添加到暂存区，以便进行下一步的提交操作

     - 添加一个修改的文件

       ```
       git add filename
       ```

     - 添加所有修改的文件

       ```
       git add .
       ```

  5. 提交更改

     将暂存区的更改提交到本地仓库，并添加提交信息。

     ```
     git commit -m "Add new feature"
     ```

  6. 拉取最新更改

     在推送本地更改之前，最好从远程仓库拉取最新的更改，以避免冲突。

     ```
     git pull origin main
     # 或者如果在新的分支上工作
     git pull origin new-feature
     ```

  7. 推送更改

     将本地的提交推送到远程仓库。

     ```
     git push origin new-feature
     ```

  8. 创建Pull Request

     在 GitHub 或其他托管平台上创建 Pull Request，邀请团队成员进行代码审查。PR 合并后，你的更改就会合并到主分支。

  9. 合并更改

     在 PR 审核通过并合并后，可以将远程仓库的主分支合并到本地分支.

     ```
     git checkout main
     git pull origin main
     git merge new-feature
     ```

  10. 删除分支

      如果不再需要新功能分支，可以将其删除。

      ```
      git branch -d new-feature
      ```

      或者从远程仓库删除分支。

      ```
      git push origin --delete new-feature
      ```

---



## Git工作区、暂存区&版本库

- 工作区

  工作区是你在本地计算机上的项目目录，你在这里进行文件的创建、修改和删除操作。工作区包含了当前项目的所有文件和子目录。

  - 特点：
    1. 显示项目的当前状态。
    2. 文件的修改在工作区中进行，但这些修改还没有被记录到版本控制中。

- 暂存区

  暂存区是一个临时存储区域，有时也叫索引，它包含了即将被提交到版本库中的文件快照，在提交之前，你可以选择性地将工作区中的修改添加到暂存区。

  - 特点：
    1. 暂存区保存了将被包括在下一个提交中的更改。
    2. 你可以多次使用 `git add` 命令来将文件添加到暂存区，直到你准备好提交所有更改。

  - 常用命令：

    eg：

    ```
    git add filename       # 将单个文件添加到暂存区
    git add .              # 将工作区中的所有修改添加到暂存区
    git status             # 查看哪些文件在暂存区中
    ```

- 版本库

  工作区有一个隐藏目录 `.git`，这个不算工作区，而是 Git 的版本库。版本库包含项目的所有版本历史记录。每次提交都会在版本库中创建一个新的快照，这些快照是不可变的，确保了项目的完整历史记录。

  - 特点：
    1. 版本库分为本地版本库和远程版本库。这里主要指本地版本库。
    2. 本地版本库存储在 `.git` 目录中，它包含了所有提交的对象和引用。

  - 常用命令：

    eg：

    ```
    git commit -m "Commit message"   # 将暂存区的更改提交到本地版本库
    git log                          # 查看提交历史
    git diff                         # 查看工作区和暂存区之间的差异
    git diff --cached                # 查看暂存区和最后一次提交之间的差异
    ```

- 关系

  - 等级

    1. 工作区 -> 暂存区

       使用 git add 命令将工作区中的修改添加到暂存区。

       eg:

       ```
       git add filename
       ```

    2. 暂存区 -> 版本库

       使用 git commit 命令将暂存区中的修改提交到版本库。

       eg:

       ```
       git commit -m "Commit message"
       ```

    3. 版本库 -> 远程仓库

       使用 git push 命令将本地版本库的提交推送到远程仓库。

       eg:

       ```
       git push origin branch-name
       ```

    4. 远程仓库 -> 本地版本库

       使用 git pull 或 git fetch 命令从远程仓库获取更新。

       eg:

       ```
       git pull origin branch-name
       # 或者
       git fetch origin branch-name
       git merge origin/branch-name
       ```

       

  - ![工作区、版本库中的暂存区和版本库之间的关系](https://www.runoob.com/wp-content/uploads/2015/02/1352126739_7909.jpg)
    1. 图中左侧为工作区，右侧为版本库。在版本库中标记为` "index" `的区域是暂存区（stage/index），标记为 `"master" `的是 master 分支所代表的目录树。
    2. 图中我们可以看出此时` "HEAD"` 实际是指向 master 分支的一个"游标"。所以图示的命令中出现 HEAD 的地方可以用 master 来替换。
    3. 图中的 objects 标识的区域为 Git 的对象库，实际位于` ".git/objects" `目录下，里面包含了创建的各种对象及内容。
    4. 当对工作区修改（或新增）的文件执行 `git add`命令时，暂存区的目录树被更新，同时工作区修改（或新增）的文件内容被写入到对象库中的一个新的对象中，而该对象的ID被记录在暂存区的文件索引中。
    5. 当执行提交操作（git commit）时，暂存区的目录树写到版本库（对象库）中，master 分支会做相应的更新。即 master 指向的目录树就是提交时暂存区的目录树。
    6. 当执行 `git reset HEAD`命令时，暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响。
    7. 当执行 `git rm --cached <file>`命令时，会直接从暂存区删除文件，工作区则不做出改变。
    8. 当执行 `git checkout .` 或者 `git checkout -- <file>` 命令时，会用暂存区全部或指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区中的改动。
    9. 当执行 `git checkout HEAD .` 或者 `git checkout HEAD <file>` 命令时，会用 HEAD 指向的 master 分支中的全部或者部分文件替换暂存区和以及工作区中的文件。这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。

- 实例

  假设你在工作目录中修改了` file.txt`

  - 工作区

    修改 `file.txt `并保存。

  - 暂存区

    将修改添加到暂存区：

    ```
    git add file.txt
    ```

  -  版本库

    将暂存区的修改提交到本地版本库：

    ```
    git commit -m "Update file.txt"
    ```

  - 远程仓库

    将本地提交推送到远程仓库：

    ```
    git push origin main
    ```



---



## Git如何创建仓库

- git init

  - 简介

    Git 使用 `git init` 命令来初始化一个 Git 仓库，Git 的很多命令都需要在 Git 的仓库中运行，所以 `git init` 是使用 Git 的第一个命令。在执行完成 `git init`命令后，Git 仓库会生成一个 `.git` 目录，该目录包含了资源的所有元数据，其他的项目目录保持不变。

  - 使用教程

    进入你想要创建仓库的目录，或者先创建一个新的目录：

    ```
    mkdir my-project
    cd my-project
    ```

    使用当前目录作为 Git 仓库，我们只需使它初始化。

    ```
    git init
    ```

    该命令执行完后会在当前目录生成一个 .git 目录。

    使用我们指定目录作为Git仓库。

    ```
    git init newrepo
    ```

    初始化后，会在 newrepo 目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中。

    如果当前目录下有几个文件想要纳入版本控制，需要先用 git add 命令告诉 Git 开始对这些文件进行跟踪，然后提交：

    ```
    $ git add *.c
    $ git add README
    $ git commit -m '初始化项目版本'
    ```

    以上命令将目录下以 .c 结尾及 README 文件提交到仓库中。

  - 注：在 Linux 系统中，commit 信息使用单引号 **'**，Windows 系统，commit 信息使用双引号 **"**。

    所以在 git bash 中`git commit -m '提交说明'`这样是可以的，在 Windows 命令行中就要使用双引号 `git commit -m "提交说明"`。

- git clone

  我们使用 `git clone` 从现有 Git 仓库中拷贝项目（类似 `svn checkout`）。

  - 命令格式

    eg:

    ```
    git clone <repo>
    or
    git clone <repo> <directory>
    ```

  - 参数说明

    1. `repo`:Git 仓库。

    2. `directory`:本地目录。

    3. 命令

       - 要克隆 Ruby 语言的 Git 代码仓库 Grit，可以用下面的命令。

         eg:

       ```
       $ git clone git://github.com/schacon/grit.git
       ```

       执行该命令后，会在当前目录下创建一个名为grit的目录，其中包含一个 .git 的目录，用于保存下载下来的所有版本记录。

       - 如果要自己定义要新建的项目目录名称eg:

       ```
       $ git clone git://github.com/schacon/grit.git mygrit
       ```

  - 配置

    git 的设置使用 `git config` 命令。



---



## Git的基本操作

- 介绍

  - Git 的工作就是创建和保存你项目的快照及与之后的快照进行对比。Git 常用的是以下 6 个命令：`git clone`、`git push`、`git add`、`git commit`、`git checkout`、`git pull`.

    eg：

    ![常用命令](https://www.runoob.com/wp-content/uploads/2015/02/git-command.jpg)

    说明：

    1. workspace：工作区
    2. staging area：暂存区/缓存区
    3. local repository：版本库或本地仓库
    4. remote repository：远程仓库
    5. git init - 初始化仓库。
    6. git add . - 添加文件到暂存区。
    7. git commit - 将暂存区内容添加到仓库中。

  - 创建仓库命令

    1. git init-初始化仓库。
    2. git clone-拷贝一份远程仓库，也就是下载一个项目。

- 提交与修改

  Git 的工作就是创建和保存你的项目的快照及与之后的快照进行对比。

  - 快照命令：

    | 命令                                | 说明                                     |
    | :---------------------------------- | :--------------------------------------- |
    | `git add`                           | 添加文件到暂存区                         |
    | `git status`                        | 查看仓库当前的状态，显示有变更的文件。   |
    | `git diff`                          | 比较文件的不同，即暂存区和工作区的差异。 |
    | `git difftool`                      | 使用外部差异工具查看和比较文件的更改。   |
    | `git range-diff`                    | 比较两个提交范围之间的差异。             |
    | `git commit`                        | 提交暂存区到本地仓库。                   |
    | `git reset`                         | 回退版本。                               |
    | `git rm`                            | 将文件从暂存区和工作区中删除。           |
    | `git mv`                            | 移动或重命名工作区文件。                 |
    | `git notes`                         | 添加注释。                               |
    | `git checkout`                      | 分支切换。                               |
    | `git switch （Git 2.23 版本引入）`  | 更清晰地切换分支。                       |
    | `git restore （Git 2.23 版本引入）` | 恢复或撤销文件的更改。                   |
    | `git show`                          | 显示 Git 对象的详细信息。                |

  - 提交日志：

    | 命令               | 说明                                                  |
    | :----------------- | :---------------------------------------------------- |
    | `git log`          | 查看历史提交记录                                      |
    | `git blame <file>` | 以列表形式查看指定文件的历史修改记录                  |
    | `git shortlog`     | 生成简洁的提交日志摘要                                |
    | `git describe`     | 生成一个可读的字符串，该字符串基于 Git 的标签系统来描 |

  - 远程操作：

    | 命令            | 说明                        |
    | :-------------- | :-------------------------- |
    | `git remote`    | 远程仓库操作                |
    | `git fetch`     | 从远程获取代码库            |
    | `git pull`      | 下载远程代码并合并          |
    | `git push`      | 上传远程代码并合并          |
    | `git submodule` | 管理包含其他 Git 仓库的项目 |

- Git文件状态

  Git 的文件状态分为三种：工作目录（Working Directory）、暂存区（Staging Area）、本地仓库（Local Repository）。

  - 工作目录：

    工作目录是你在本地计算机上看到的项目文件。它是你实际操作文件的地方，包括查看、编辑、删除和创建文件。所有对文件的更改首先发生在工作目录中。

    1. 未跟踪：新创建的文件，未被 Git 记录。
    2. 已跟踪：已被 Git 跟踪的文件发生了更改，但这些更改还没有被提交到 Git 记录中。

  - 暂存区：

    暂存区，也称为索引（Index），是一个临时存储区域，用于保存即将提交到本地仓库的更改。你可以选择性地将工作目录中的更改添加到暂存区中，这样你可以一次提交多个文件的更改，而不必提交所有文件的更改。

    1. 使用 `git add <filename>` 命令将文件从工作目录添加到暂存区。

    2. 使用 `git add .` 命令将当前目录下的所有更改添加到暂存区。

       eg：

       ```
       git add <filename>  # 添加指定文件到暂存区
       git add .           # 添加所有更改到暂存区
       ```

       

  - 本地仓库：

    本地仓库是一个隐藏在 `.git` 目录中的数据库，用于存储项目的所有提交历史记录。每次你提交更改时，Git 会将暂存区中的内容保存到本地仓库中。

    使用 `git commit -m "commit message"` 命令将暂存区中的更改提交到本地仓库。

    eg：

    ```
    git commit -m "commit message"  # 提交暂存区的更改到本地仓库
    ```

    

  - 文件状态的转换流程：

    1. 未跟踪：新创建的文件最初是未跟踪的。它们存在于工作目录中，但没有被 Git 跟踪。

       eg：

       ```
       touch newfile.txt  # 创建一个新文件
       git status         # 查看状态，显示 newfile.txt 未跟踪
       ```

    2. 已跟踪：通过 `git add` 命令将未跟踪的文件添加到暂存区后，文件变为已跟踪状态。

       eg：

       ```
       git add newfile.txt  # 添加文件到暂存区
       git status           # 查看状态，显示 newfile.txt 在暂存区
       ```

    3. 已修改：对已跟踪的文件进行更改后，这些更改会显示为已修改状态，但这些更改还未添加到暂存区。

       eg：

       ```
       echo "Hello, World!" > newfile.txt  # 修改文件
       git status                          # 查看状态，显示 newfile.txt 已修改
       ```

    4. 已暂存： 使用 `git add` 命令将修改过的文件添加到暂存区后，文件进入已暂存状态，等待提交。

       eg：

       ```
       git add newfile.txt  # 添加文件到暂存区
       git status           # 查看状态，显示 newfile.txt 已暂存
       ```

    5. 已提交：使用 `git commit` 命令将暂存区的更改提交到本地仓库后，这些更改被记录下来，文件状态返回为已跟踪状态。
       eg：

       ```
       git commit -m "Added newfile.txt"  # 提交更改
       git status                         # 查看状态，工作目录干净
       ```

    

---



## Git的分支管理

- 简介

  - Git 分支管理能够让多个开发人员并行工作，开发新功能、修复 bug 或进行实验，而不会影响主代码库。每一种版本控制系统都以某种形式支持分支，一个分支代表一条独立的开发线。使用分支意味着你可以从开发主线上分离开来，然后在不影响主线的同时继续工作。

    ![分支](https://static.jyshare.com/images/svg/git-brance.svg)

  - 创建分支

    1. 创建新分支并切换到该分支：

       ```
       git checkout -b <branchname>
       ```

    2. 切换分支命令:

       ```
       git checkout (branchname)
       ```

  - 查看分支

    1. 查看所有分支：

       ```
       git branch
       ```

    2. 查看远程分支：

       ```
       git branch -r
       ```

    3. 查看所有本地和远程分支：

       ```
       git branch -a
       ```

  - 合并分支

    将其他分支合并到当前分支：

    ```
    git merge <branchname>
    ```

  - 解决合并冲突

    当合并过程中出现冲突时，Git 会标记冲突文件，你需要手动解决冲突。

    1. 标记冲突解决完成：

       ```
       git add <conflict-file>
       ```

    2. 提交合并结果：

       ```
       git commit
       ```

  - 删除分支

    1. 删除本地分支：

    ```
    git branch -d <branchname>
    ```

    2. 强制删除未合并的分支：

    ```
    git branch -D <branchname>
    ```

    3. 删除远程分支：

    ```
    git push origin --delete <branchname>
    ```

- Git 分支管理

  1. 列出分支

     列出分支基本命令：

     ```
     git branch
     ```

  2. 删除分支

     删除分支命令：

     ```
     git branch -d (branchname)
     ```

  3. 分支合并

     分支合并命令：

     ```
     git merge
     ```

  4. 合并冲突

     合并并不仅仅是简单的文件添加、移除的操作，Git 也会合并修改。

     ```
     $ git branch
     * master
     $ cat runoob.php
     ```

- 命令手册

  | **命令**        | **说明**                                                     | **用法示例**                                                 |
  | :-------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
  | `git branch`    | 列出、创建或删除分支。它不切换分支，只是用于管理分支的存在。 | `git branch`：列出所有分支 `git branch new-branch`：创建新分支 `git branch -d old-branch`：删除分支 |
  | `git checkout`  | 切换到指定的分支或恢复工作目录中的文件。也可以用来检出特定的提交。 | `git checkout branch-name`：切换分支 `git checkout file.txt`：恢复文件到工作区 `git checkout <commit-hash>`：检出特定提交 |
  | `git switch`    | 专门用于切换分支，相比 `git checkout` 更加简洁和直观，主要用于分支操作。 | `git switch branch-name`：切换到指定分支 `git switch -c new-branch`：创建并切换到新分支 |
  | `git merge`     | 合并指定分支的更改到当前分支。                               | `git merge branch-name`：将指定分支的更改合并到当前分支      |
  | `git mergetool` | 启动合并工具，以解决合并冲突。                               | `git mergetool`：使用默认合并工具解决冲突 `git mergetool --tool=<tool-name>`：指定合并工具 |
  | `git log`       | 显示提交历史记录。                                           | `git log`：显示提交历史 `git log --oneline`：以简洁模式显示提交历史 |
  | `git stash`     | 保存当前工作目录中的未提交更改，并将其恢复到干净的工作区。   | `git stash`：保存当前更改 `git stash pop`：恢复最近保存的更改 `git stash list`：列出所有保存的更改 |
  | `git tag`       | 创建、列出或删除标签。标签用于标记特定的提交。               | `git tag`：列出所有标签 `git tag v1.0`：创建一个新标签 `git tag -d v1.0`：删除标签 |
  | `git worktree`  | 允许在一个仓库中检查多个工作区，适用于同时处理多个分支。     | `git worktree add <path> branch-name`：在指定路径添加新的工作区并切换到指定分支 `git worktree remove <path>`：删除工作区 |

  

---



## Git标签

如果你达到一个重要的阶段，并希望永远记住提交的快照，你可以使用`git tag`给它打上标签。

- 语法格式：

- 推送标签到远程仓库：

  1. 显式：

     ```
     git push origin <tagname>
     ```

  2. 推送所有：

     ```
     git push origin --tags
     ```

- 删除轻量标签：

  1. 本地删除：

     ```
     git tag -d <tagname>
     ```

  2. 远程删除：

     ```
     git push origin --delete <tagname>
     ```

- 附注：

  附注标签存储了创建者的名字、电子邮件、日期，并且可以包含标签信息。附注标签更为正式，适用于需要额外元数据的场景。

  1. 语法：

     ```
     git tag -a <tagname> -m "message"
     ```

  2. PGP:

     ```
     git tag -s <tagname> -m "runoob.com标签"
     ```

  3. 如何查看：

     eg：

     ```
     git show <tagname>
     ```

- 删除：

  1. 本地删除：

     eg：

     ```
     git tag -d v1.0
     ```

  2. 远程删除：

     eg：

     ```
     git push origin --delete v1.0
     ```

  

---



## Git如何查看提交历史

查看 Git 提交历史可以帮助你了解代码的变更情况和开发进度。

- git log

  1. 特点：

     - 命令用于查看 Git 仓库中提交历史记录
     - 显示了从最新提交到最早提交的所有提交信息，包括提交的哈希值、作者、提交日期和提交消息等。

  2. 基本语法:

     ```
     git log [选项] [分支名/提交哈希]
     ```

  3. 常用选项：

     - `-p`：显示提交的补丁（具体更改内容）。
     - `--oneline`：以简洁的一行格式显示提交信息。
     - `--graph`：以图形化方式显示分支和合并历史。
     - `--decorate`：显示分支和标签指向的提交。
     - `--author=<作者>`：只显示特定作者的提交。
     - `--since=<时间>`：只显示指定时间之后的提交。
     - `--until=<时间>`：只显示指定时间之前的提交。
     - `--grep=<模式>`：只显示包含指定模式的提交消息。
     - `--no-merges`：不显示合并提交。
     - `--stat`：显示简略统计信息，包括修改的文件和行数。
     - `--abbrev-commit`：使用短提交哈希值。
     - `--pretty=<格式>`：使用自定义的提交信息显示格式。
     -  `--oneline `：选项来查看历史记录的简洁的版本。
     - `--graph `:查看历史中什么时候出现了分支、合并。
     - `--reverse` ：逆向显示所有日志。
     - `--since`:显示自指定日期之后的提交
     - `-n <number>`：限制显示的提交数

     - `--until`:显示指定日期之前的提交
     - `--author`：只显示某个作者的提交
     - [更多](http://git-scm.com/docs/git-log)

- git blame

  1. 特点：

     -  命令用于逐行显示指定文件的每一行代码是由谁在什么时候引入或修改的。
     - 可以追踪文件中每一行的变更历史，包括作者、提交哈希、提交日期和提交消息等信息。

  2. 基本语法：

     ```
     git blame [选项] <文件路径>
     ```

  3. 常用选项：

     - `-L <起始行号>,<结束行号>`：只显示指定行号范围内的代码注释。
     - `-C`：对于重命名或拷贝的代码行，也进行代码行溯源。
     - `-M`：对于移动的代码行，也进行代码行溯源。
     - `-C -C` 或 `-M -M`：对于较多改动的代码行，进行更进一步的溯源。
     - `--show-stats`：显示包含每个作者的行数统计信息。

- 回复和回退

  Git 提供了多种方式来恢复和回退到之前的版本，不同的命令适用于不同的场景和需求。

  1. `git checkout`:检查出特定版本的文件

     用于切换分支或恢复工作目录中的文件到指定的提交。

     eg:

     恢复工作目录中的文件到某个提交：

     ```
     git checkout <commit> -- <filename>
     ```

  2. `git reset`:重置当前分支到特定提交

     - --soft:只重置 HEAD 到指定的提交，暂存区和工作目录保持不变。

       ```
       git reset --soft <commit>
       ```

     - --mixed:重置 HEAD 到指定的提交，暂存区重置，但工作目录保持不变。

       ```
       git reset --mixed <commit>
       ```

     - hard:重置 HEAD 到指定的提交，暂存区和工作目录都重置。

       ```
       git reset --hard <commit>
       ```

  3. `git revert`:撤销某次提交

     创建一个新的提交，用来撤销指定的提交，它不会改变提交历史，适用于已经推送到远程仓库的提交。

  4. `git reflog`:查看历史操作记录

     记录了所有 HEAD 的移动。即使提交被删除或重置，也可以通过 reflog 找回。

---















