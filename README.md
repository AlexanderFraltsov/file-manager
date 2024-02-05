# file-manager

## ATTENTION!
For commands `rn`, `cp`, `mv`, `compress` and `decompress`:
if one of your paths contains a SPACE CHARACTER, you need to enclose both paths in double quotes.

Example:
```
	rn "folder 1/file 1.txt"  "file 2.txt"
```

## README
- The program is started by npm-script start in following way
```
  npm run start -- --username=your_username
```
- The program is stopped by command `.exit` or pressed `Ctrl+C`.

List of operations and their syntax
- Navigation & working directory (nwd)
    - Go upper from current directory
    ```bash
    up
    ```
    - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
    ```bash
    cd path_to_directory
    ```
    - Print in console list of all files and folders in current directory
    ```bash
    ls
    ```
- Basic operations with files
    - Read file and print it's content in console
    ```bash
    cat path_to_file
    ```
    - Create empty file in current working directory
    ```bash
    add new_file_name
    ```
    - Rename file
    ```bash
    rn path_to_file new_filename
    ```
    - Copy file
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Move file (same as copy but initial file is deleted)
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Delete file
    ```bash
    rm path_to_file
    ```
- Operating system info (prints following information in console)
    - Get EOL (default system End-Of-Line) and print it to console
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
    ```bash
    os --cpus
    ```
    - Get home directory and print it to console
    ```bash
    os --homedir
    ```
    - Get current *system user name* (Do not confuse with the username that is set when the application starts) and print it to console
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled and print it to console
    ```bash
    os --architecture
    ```
- Hash calculation
    - Calculate hash for file and print it into console
    ```bash
    hash path_to_file
    ```
- Compress and decompress operations
    - Compress file (using Brotli algorithm, should be done using Streams API)
    ```bash
    compress path_to_file path_to_destination
    ```
    - Decompress file (using Brotli algorithm, should be done using Streams API)
    ```bash
    decompress path_to_file path_to_destination
    ```
