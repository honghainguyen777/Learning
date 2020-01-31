// Implements a dictionary's functionality

#include <stdbool.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <strings.h>

#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

// Number of buckets in hash table
const unsigned int N = 2020;

// initialize the word count or number of word in the hash table
int count = 0;

// Hash table
node *table[N];

// Returns true if word is in dictionary else false
bool check(const char *word)
{
    // even strcasecmp can compare words case-insensitively,
    //an upper case word given different hash compare to lower-case word
    // convert word to lower case
    int len = strlen(word);
    // initiallize the lower-case word
    char lc_word[len + 1];
    // convert any upper-case character in the word to lowercase
    for (int i = 0; i < len + 1; i++)
    {
        lc_word[i] = tolower(word[i]);
    }

    // hash the word first
    int index = hash(lc_word);

    // traverse linked list, looking for the word using strcasecmp
    // initiallize the cursor to be the first node in the indexed linked list
    node *cursor = table[index];

    // search for the word in the linked in the hash table
    while (cursor != NULL)
    {
        // at each node in the linked list, compare the word case-insensitively
        // we may use the strcmp(cursor-> lc_Word, word) to compare lowercase word
        if (strcasecmp(cursor->word, word) == 0)
        {
            return true;
        }
        else
        {
            // if not compared, move the cursor to the next node and check
            cursor = cursor->next;
        }
    }

    //if cursor == NULL then end of the linked list -> word is not in the dict -> false
    return false;
}

// Hashes word to a number
// hash function source: https://stackoverflow.com/questions/20462826/hash-function-for-strings-in-c
unsigned int hash(const char *word)
{
    unsigned int hash = 0;
    for (int i = 0; word[i] != '\0'; i++)
    {
        hash = 31 * hash + word[i];
    }
    return hash % N;
}

// Loads dictionary into memory, returning true if successful else false
bool load(const char *dictionary)
{
    // open dictionaly file and check if return value is NULL
    FILE *dict_file = fopen(dictionary, "r");
    // check if the file exists
    if (dict_file == NULL)
    {
        return false;
    }

    // initialize word
    char word[47];
    // intitialize hash value
    unsigned int index = 0;

    // get word from the dictionary
    while (fscanf(dict_file, "%s", word) != EOF)
    {
        // allocate enough memory to store a new node
        node *new_node = malloc(sizeof(node));
        // if not enough, then return false
        if (new_node == NULL)
        {
            return false;
        }
        // copy the word to new node by pointing the pointer to word
        strcpy(new_node->word, word);

        // hash the word to get an index
        index = hash(word);

        // if the first node in the linked list exist, then set the new node's pointer to the first node
        // in the hash table
        if (table[index] != NULL)
        {
            new_node->next = table[index];
            count++;
            continue;
        }
        // if the node at index is empty, then put the word/new node there and free the allocated memory
        table[index] = new_node;
        count++;
    }

    // close the file when all words in the dictionary are loaded
    fclose(dict_file);
    return true;
}

// Returns number of words in dictionary if loaded else 0 if not yet loaded
unsigned int size(void)
{
    return count;
}

// Unloads dictionary from memory, returning true if successful else false
bool unload(void)
{
    // go through all the hash table
    for (int i = 0; i < N; i++)
    {
        // set the cursor to the first node of the linked list i
        node *cursor = table[i];

        // go through every node in the linked list
        while (cursor != NULL)
        {
            // create a temp cursor so that we dont loose the cursor when we free
            // if not then we loose the connection and cant point to the next node in the linked list
            node *temp = cursor;
            // move cursor to the next node
            cursor = cursor->next;

            // and remove the node where temp point to
            free(temp);
        }
    }

    return true;
}
