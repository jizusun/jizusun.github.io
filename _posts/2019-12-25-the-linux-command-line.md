---
layout: post
title: "The Linux Command Line by William Shotts"
categories: draft
---


http://linuxcommand.org/tlcl.php


- [Part 4 - Writing Shell Scripts](#part-4---writing-shell-scripts)
  - [24 - Writing Your First Script](#24---writing-your-first-script)
    - [Configuring vim for Script Writing](#configuring-vim-for-script-writing)
  - [25 - Starting a Project](#25---starting-a-project)
    - [Variables and Constants](#variables-and-constants)




# Part 4 - Writing Shell Scripts
## 24 - Writing Your First Script

How to Write a Shell Script
1. What a script `#!/bin/bash` (`shebang`)
2. Make the script executable: `755` for everyone can execute, `700` for only the owner can execute
3. Put the script somewhere the shell can find it: usually in `/usr/local/bin`

By using line-continuations(backslash-linefeed sequences) and indentation, the logic of command can be more clearly to the reader.

### Configuring `vim` for Script Writing
```sh
:syntax on 
:set hlsearch
:set tabstop=4
:set autoindent # to stop indentation, type `Ctrl-d`
```

## 25 - Starting a Project

### Variables and Constants

When the shell encounters a variables, it automatically creates it.

```sh
# this declares a read-only variable (constant)
declare -r TITLE="Page Title"
```

```sh
filename="myfile"
touch "$filename"
# mv "$filename" "$filename1"
# this avoids the shell intepreting the second argument as a new (and empty) variable
mv "$filename" "${filename}1"
```

```sh
ls=aaa # assign the string "aaa" to variable ls
echo "ls equals $ls"
echo ${ls} # print the variable ls
echo $(ls) # results of a command, one line
echo "$(ls)" # results of a command, multiple lines
echo $((5+7)) # 12
echo "aaa\nbbb" # escape sequences such as tabs and newlines
```

`here document`: is an additional form of I/O redirection in which we embed a body of text into our scritpt and feed it into the standard input of a command.

- Single and double quotaes within here documents losed their special meaning to the shell

```sh
command << token 
text
token
```

```sh
foo="some text"

cat << _EOF_
$foo
"$foo"
'$foo'
\$foo
_EOF_
```




