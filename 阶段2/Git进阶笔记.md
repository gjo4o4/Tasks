# Git进阶笔记

## 回滚

- 修改最近一次（git commit）

  适用于刚在本地提交完，还未推送至远程：

  eg：

  ```
  git commit--amend
  ```

- 撤销本地提交(git  reset)

  适用于一个或者多个只在本地提交，还未推送至远程：

  1. --soft：

     撤销提交，保留至工作区，还可重新编辑：

     eg:

     ```
     git reset--soft HEAD~N
     ```

  2. --mixed:

     撤销提交，保留至工作区，还可重新编辑：

     eg:

     ```
     git reset--mixed HEAD~N
     ```

  3. --hard:

     撤销提交，彻底删除，不可重新编辑：

     eg:

     ```
     git reset--hard HEAD~N
     ```

- 撤销远程提交(git revert)

  1. 单个：

     eg：

     ```
     git revert <commit-id>
     ```

  2. 多个：

     eg:

     ```
     git revert <old-commit-id>
     ```

- 误删怎么处理：git reflog 

   这个命令会记录你所有的操作历史，包括那些“被删除”的提交。你可以通过它找到误删提交的哈希值，然后使用  git reset  或  git checkout  将其恢复

- 最后记得`git push`!



---



## 冲突解决

当 Git 无法自动合并两个分支对同一文件同一位置的修改时，就会发生冲突 。解决冲突的过程其实就是你手动决定最终保留哪些代码。

1. 当你执行  git merge  或  git pull  时，如果发生冲突，Git 会提示“自动合并失败”。你可以通过  git status  命令查看所有存在冲突的文件 。

2. 打开冲突文件，你会看到 Git 插入的特殊标记

   eg：

   ```
   <<<<<<< HEAD
     --这是你当前分支的代码
   =======                                   --这是要合并进来的分支的代码
   >>>>>>> branch-name                       --你需要手动编辑这部分内容（决定是保留你的代码、对方的代码，还是将两者结合 ）。
   ```

3. 解决完一个文件的冲突后，使用  git add <文件名>  命令告诉 Git 这个文件的冲突已解决。当所有冲突文件都处理完毕后，执行  git commit  来完成合并 。
