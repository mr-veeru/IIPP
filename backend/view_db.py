#!/usr/bin/env python3
"""
Database Viewer Script for IIPP
This script displays all tables and their contents in the SQLite database.
"""

import sqlite3
import os

def view_database():
    """View all tables and their contents in the database."""
    
    # Path to the database file
    db_path = os.path.join('instance', 'iipp.db')
    
    if not os.path.exists(db_path):
        print(f"❌ Database file not found at: {db_path}")
        print("Make sure you're running this script from the backend directory.")
        return
    
    try:
        # Connect to the database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("🔍 IIPP Database Contents")
        print("=" * 50)
        
        # Get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        if not tables:
            print("❌ No tables found in the database.")
            return
        
        print(f"📋 Found {len(tables)} table(s):")
        for table in tables:
            print(f"  - {table[0]}")
        print()
        
        # Display contents of each table
        for table in tables:
            table_name = table[0]
            print(f"📊 Table: {table_name}")
            print("-" * 30)
            
            # Get table schema
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()
            
            if columns:
                # Get column names
                column_names = [col[1] for col in columns]
                print(f"Columns: {', '.join(column_names)}")
                print()
                
                # Get all data from the table
                cursor.execute(f"SELECT * FROM {table_name};")
                rows = cursor.fetchall()
                
                if rows:
                    print("Data:")
                    for i, row in enumerate(rows, 1):
                        print(f"  Row {i}: {row}")
                else:
                    print("(No data)")
            else:
                print("(No columns found)")
            
            print("\n" + "=" * 50 + "\n")
        
        conn.close()
        print("✅ Database viewing completed!")
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

def add_sample_data():
    """Add some sample data to the database if it's empty."""
    
    db_path = os.path.join('instance', 'iipp.db')
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if we have any data
        cursor.execute("SELECT COUNT(*) FROM question;")
        question_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM user;")
        user_count = cursor.fetchone()[0]
        
        print(f"📊 Current database state:")
        print(f"  - Users: {user_count}")
        print(f"  - Questions: {question_count}")
        
        if question_count == 0:
            print("\n📝 Adding sample questions...")
            
            sample_questions = [
                ("Two Sum", "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.", "Easy", "Array,Hash Table"),
                ("Valid Parentheses", "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.", "Easy", "Stack,String"),
                ("Reverse String", "Write a function that reverses a string. The input string is given as an array of characters s.", "Easy", "Two Pointers,String"),
                ("Maximum Subarray", "Given an integer array nums, find the subarray with the largest sum, and return its sum.", "Medium", "Array,Dynamic Programming"),
                ("Merge Two Sorted Lists", "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list.", "Easy", "Linked List,Recursion"),
                ("Binary Tree Inorder Traversal", "Given the root of a binary tree, return the inorder traversal of its nodes' values.", "Easy", "Tree,Depth-First Search"),
                ("Climbing Stairs", "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.", "Easy", "Dynamic Programming"),
                ("Valid Anagram", "Given two strings s and t, return true if t is an anagram of s, and false otherwise.", "Easy", "Hash Table,String,Sorting"),
                ("Best Time to Buy and Sell Stock", "You are given an array prices where prices[i] is the price of a given stock on the ith day.", "Easy", "Array,Dynamic Programming"),
                ("Linked List Cycle", "Given head, the head of a linked list, determine if the linked list has a cycle in it.", "Easy", "Hash Table,Linked List,Two Pointers")
            ]
            
            for title, description, difficulty, tags in sample_questions:
                cursor.execute(
                    "INSERT INTO question (title, description, difficulty, tags) VALUES (?, ?, ?, ?)",
                    (title, description, difficulty, tags)
                )
            
            conn.commit()
            print(f"✅ Added {len(sample_questions)} sample questions!")
        
        conn.close()
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")

if __name__ == "__main__":
    print("🚀 IIPP Database Viewer")
    print("=" * 30)
    
    # First, try to add sample data if needed
    add_sample_data()
    print()
    
    # Then view the database
    view_database() 