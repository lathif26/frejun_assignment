// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTables } from '../redux/tableAction';


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, ScrollView, StyleSheet } from 'react-native';
// import { db } from '../firebase';

// const TableListScreen = () => {
//   const [students, setStudents] = useState([]);
//   const [newStudentName, setNewStudentName] = useState('');
//   const [newStudentMarks, setNewStudentMarks] = useState({
//     tamil: '',
//     english: '',
//     maths: '',
//     science: '',
//     socialScience: '',
//   });
//   const [editingStudentId, setEditingStudentId] = useState(null);
//   const [editingStudentName, setEditingStudentName] = useState('');
//   const [editingStudentMarks, setEditingStudentMarks] = useState({
//     tamil: '',
//     english: '',
//     maths: '',
//     science: '',
//     socialScience: '',
//   });

//   useEffect(() => {
//     // Fetch student data from Firestore
//     const studentsRef = db.collection('students');

//     studentsRef.get().then((querySnapshot) => {
//       const fetchedStudents = [];
//       querySnapshot.forEach((doc) => {
//         const studentData = doc.data();
//         fetchedStudents.push({ id: doc.id, ...studentData });
//       });
//       setStudents(fetchedStudents);
//     });
//   }, []);

//   const handleAddStudent = () => {
//     const studentsRef = db.collection('students');

//     const newStudent = {
//       name: newStudentName,
//       marks: newStudentMarks,
//     };

//     studentsRef
//       .add(newStudent)
//       .then((docRef) => {
//         console.log('New student added with ID:', docRef.id);
//         setStudents([...students, { id: docRef.id, ...newStudent }]);
//         setNewStudentName('');
//         setNewStudentMarks({
//           tamil: '',
//           english: '',
//           maths: '',
//           science: '',
//           socialScience: '',
//         });
//       })
//       .catch((error) => {
//         console.error('Error adding new student:', error);
//       });
//   };

//   const handleEditStudent = () => {
//     if (!editingStudentId) {
//       console.error('No student ID specified for editing.');
//       return;
//     }

//     const studentRef = db.collection('students').doc(editingStudentId);

//     studentRef
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           studentRef
//             .update({
//               name: editingStudentName,
//               marks: editingStudentMarks,
//             })
//             .then(() => {
//               console.log('Student updated successfully.');
//               const updatedStudents = students.map((student) => {
//                 if (student.id === editingStudentId) {
//                   return {
//                     id: student.id,
//                     name: editingStudentName,
//                     marks: editingStudentMarks,
//                   };
//                 } else {
//                   return student;
//                 }
//               });
//               setStudents(updatedStudents);
//               setEditingStudentId(null);
//               setEditingStudentName('');
//               setEditingStudentMarks({
//                 tamil: '',
//                 english: '',
//                 maths: '',
//                 science: '',
//                 socialScience: '',
//               });
//             })
//             .catch((error) => {
//               console.error('Error updating student:', error);
//             });
//         } else {
//           console.log('Student document does not exist.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error retrieving student document:', error);
//       });
//   };

//   const handleDeleteStudent = (studentId) => {
//     const updatedStudents = students.filter((student) => student.id !== studentId);

//     const studentRef = db.collection('students').doc(studentId);

//     studentRef
//       .delete()
//       .then(() => {
//         console.log('Student deleted successfully.');
//         setStudents(updatedStudents); // Update the state with filtered students
//       })
//       .catch((error) => {
//         console.error('Error deleting student:', error);
//       });
//   };

//   const handleStartEditing = (student) => {
//     setEditingStudentId(student.id);
//     setEditingStudentName(student.name);
//     setEditingStudentMarks(student.marks);
//   };

//   const renderStudentTable = (student) => {
//     if (!student || !student.marks) {
//       return null;
//     }

//     return (
//       <View style={styles.tableRow}>
//         <Text style={styles.tableCell}>{student.name}</Text>
//         <Text style={styles.tableCell}>{student.marks.tamil}</Text>
//         <Text style={styles.tableCell}>{student.marks.english}</Text>
//         <Text style={styles.tableCell}>{student.marks.maths}</Text>
//         <Text style={styles.tableCell}>{student.marks.science}</Text>
//         <Text style={styles.tableCell}>{student.marks.socialScience}</Text>
//         <View style={styles.tableButtons}>
//           <Button title="Edit" onPress={() => handleStartEditing(student)} />
//           <Button title="Delete" onPress={() => handleDeleteStudent(student.id)} />
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Student List</Text>
//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Student Name"
//           value={newStudentName}
//           onChangeText={(text) => setNewStudentName(text)}
//         />
//         <View style={styles.marksContainer}>
//           <TextInput
//             style={styles.marksInput}
//             placeholder="Tamil"
//             value={newStudentMarks.tamil}
//             onChangeText={(text) =>
//               setNewStudentMarks((prevMarks) => ({ ...prevMarks, tamil: text }))
//             }
//           />
//           <TextInput
//             style={styles.marksInput}
//             placeholder="English"
//             value={newStudentMarks.english}
//             onChangeText={(text) =>
//               setNewStudentMarks((prevMarks) => ({ ...prevMarks, english: text }))
//             }
//           />
//           <TextInput
//             style={styles.marksInput}
//             placeholder="Maths"
//             value={newStudentMarks.maths}
//             onChangeText={(text) =>
//               setNewStudentMarks((prevMarks) => ({ ...prevMarks, maths: text }))
//             }
//           />
//           <TextInput
//             style={styles.marksInput}
//             placeholder="Science"
//             value={newStudentMarks.science}
//             onChangeText={(text) =>
//               setNewStudentMarks((prevMarks) => ({ ...prevMarks, science: text }))
//             }
//           />
//           <TextInput
//             style={styles.marksInput}
//             placeholder="Social Science"
//             value={newStudentMarks.socialScience}
//             onChangeText={(text) =>
//               setNewStudentMarks((prevMarks) => ({ ...prevMarks, socialScience: text }))
//             }
//           />
//         </View>
//         <Button title="Add Student" onPress={handleAddStudent} />
//       </View>
//       <Text style={styles.subtitle}>Student Table</Text>
//       <ScrollView horizontal>
//         <View style={styles.table}>
//           <View style={styles.tableHeader}>
//             <Text style={styles.tableHeaderCell}>Name</Text>
//             <Text style={styles.tableHeaderCell}>Tamil</Text>
//             <Text style={styles.tableHeaderCell}>English</Text>
//             <Text style={styles.tableHeaderCell}>Maths</Text>
//             <Text style={styles.tableHeaderCell}>Science</Text>
//             <Text style={styles.tableHeaderCell}>Social Science</Text>
//             <Text style={styles.tableHeaderCell}></Text>
//           </View>
//           <FlatList
//             data={students}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => renderStudentTable(item)}
//           />
//         </View>
//       </ScrollView>
//       {editingStudentId && (
//         <View style={styles.form}>
//           <TextInput
//             style={styles.input}
//             placeholder="Student Name"
//             value={editingStudentName}
//             onChangeText={(text) => setEditingStudentName(text)}
//           />
//           <View style={styles.marksContainer}>
//             <TextInput
//               style={styles.marksInput}
//               placeholder="Tamil"
//               value={editingStudentMarks.tamil}
//               onChangeText={(text) =>
//                 setEditingStudentMarks((prevMarks) => ({ ...prevMarks, tamil: text }))
//               }
//             />
//             <TextInput
//               style={styles.marksInput}
//               placeholder="English"
//               value={editingStudentMarks.english}
//               onChangeText={(text) =>
//                 setEditingStudentMarks((prevMarks) => ({ ...prevMarks, english: text }))
//               }
//             />
//             <TextInput
//               style={styles.marksInput}
//               placeholder="Maths"
//               value={editingStudentMarks.maths}
//               onChangeText={(text) =>
//                 setEditingStudentMarks((prevMarks) => ({ ...prevMarks, maths: text }))
//               }
//             />
//             <TextInput
//               style={styles.marksInput}
//               placeholder="Science"
//               value={editingStudentMarks.science}
//               onChangeText={(text) =>
//                 setEditingStudentMarks((prevMarks) => ({ ...prevMarks, science: text }))
//               }
//             />
//             <TextInput
//               style={styles.marksInput}
//               placeholder="Social Science"
//               value={editingStudentMarks.socialScience}
//               onChangeText={(text) =>
//                 setEditingStudentMarks((prevMarks) => ({ ...prevMarks, socialScience: text }))
//               }
//             />
//           </View>
//           <Button title="Save Changes" onPress={handleEditStudent} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   form: {
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   marksContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   marksInput: {
//     flex: 1,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginRight: 10,
//     paddingHorizontal: 10,
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: 'gray',
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: 'lightgray',
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     paddingVertical: 10,
//   },
//   tableHeaderCell: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     paddingVertical: 10,
//   },
//   tableCell: {
//     flex: 1,
//     textAlign: 'center',
//   },
//   tableButtons: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
// });

// export default TableListScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';


const TableListScreen = () => {
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentMarks, setNewStudentMarks] = useState({
    tamil: '',
    english: '',
    maths: '',
    science: '',
    socialScience: '',
  });
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editingStudentName, setEditingStudentName] = useState('');
  const [editingStudentMarks, setEditingStudentMarks] = useState({
    tamil: '',
    english: '',
    maths: '',
    science: '',
    socialScience: '',
  });

  useEffect(() => {
    // Fetch student data from Firestore
    const studentsRef = db.collection('students');

    studentsRef.get().then((querySnapshot) => {
      const fetchedStudents = [];
      querySnapshot.forEach((doc) => {
        const studentData = doc.data();
        fetchedStudents.push({ id: doc.id, ...studentData });
      });
      setStudents(fetchedStudents);
    });
  }, []);

  const handleAddStudent = () => {
    const studentsRef = db.collection('students');

    const newStudent = {
      name: newStudentName,
      marks: newStudentMarks,
    };

    studentsRef
      .add(newStudent)
      .then((docRef) => {
        console.log('New student added with ID:', docRef.id);
        setStudents([...students, { id: docRef.id, ...newStudent }]);
        setNewStudentName('');
        setNewStudentMarks({
          tamil: '',
          english: '',
          maths: '',
          science: '',
          socialScience: '',
        });
      })
      .catch((error) => {
        console.error('Error adding new student:', error);
      });
  };

  const handleEditStudent = () => {
    if (!editingStudentId) {
      console.error('No student ID specified for editing.');
      return;
    }

    const studentRef = db.collection('students').doc(editingStudentId);

    studentRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          studentRef
            .update({
              name: editingStudentName,
              marks: editingStudentMarks,
            })
            .then(() => {
              console.log('Student updated successfully.');
              const updatedStudents = students.map((student) => {
                if (student.id === editingStudentId) {
                  return {
                    id: student.id,
                    name: editingStudentName,
                    marks: editingStudentMarks,
                  };
                } else {
                  return student;
                }
              });
              setStudents(updatedStudents);
              setEditingStudentId(null);
              setEditingStudentName('');
              setEditingStudentMarks({
                tamil: '',
                english: '',
                maths: '',
                science: '',
                socialScience: '',
              });
            })
            .catch((error) => {
              console.error('Error updating student:', error);
            });
        } else {
          console.log('Student document does not exist.');
        }
      })
      .catch((error) => {
        console.error('Error retrieving student document:', error);
      });
  };

  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);

    const studentRef = db.collection('students').doc(studentId);

    studentRef
      .delete()
      .then(() => {
        console.log('Student deleted successfully.');
        setStudents(updatedStudents); // Update the state with filtered students
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  const handleStartEditing = (student) => {
    setEditingStudentId(student.id);
    setEditingStudentName(student.name);
    setEditingStudentMarks(student.marks);
  };

  const renderStudentTable = (student) => {
    if (!student || !student.marks) {
      return null;
    }

    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{student.name}</Text>      
        <Text style={styles.tableCell}>{student.marks.tamil}</Text>        
        <Text style={styles.tableCell}>{student.marks.english}</Text>        
        <Text style={styles.tableCell}>{student.marks.maths}</Text>
        <Text style={styles.tableCell}>{student.marks.science}</Text>
        <Text style={styles.tableCell}>{student.marks.socialScience}</Text>
        <View style={styles.tableButtons}>
         
          <TouchableOpacity onPress={() => handleStartEditing(student)}>
            <Icon name="edit" size={20} color="blue" />
            {/* <View style={styles.tableButtons}></View> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteStudent(student.id)}>
            <Icon name="trash" size={20} color="red" />
            {/* <View style={styles.tableButtons}></View> */}
          </TouchableOpacity>
        </View>
      </View>
    );
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student List</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Student Name"
          value={newStudentName}
          onChangeText={(text) => setNewStudentName(text)}
        />
        <View style={styles.marksContainer}>
          <TextInput
            style={styles.marksInput}
            placeholder="Tamil"
            value={newStudentMarks.tamil}
            onChangeText={(text) =>
              setNewStudentMarks((prevMarks) => ({ ...prevMarks, tamil: text }))
            }
          />
          <TextInput
            style={styles.marksInput}
            placeholder="English"
            value={newStudentMarks.english}
            onChangeText={(text) =>
              setNewStudentMarks((prevMarks) => ({ ...prevMarks, english: text }))
            }
          />
          <TextInput
            style={styles.marksInput}
            placeholder="Maths"
            value={newStudentMarks.maths}
            onChangeText={(text) =>
              setNewStudentMarks((prevMarks) => ({ ...prevMarks, maths: text }))
            }
          />
          <TextInput
            style={styles.marksInput}
            placeholder="Science"
            value={newStudentMarks.science}
            onChangeText={(text) =>
              setNewStudentMarks((prevMarks) => ({ ...prevMarks, science: text }))
            }
          />
          <TextInput
            style={styles.marksInput}
            placeholder="Social Science"
            value={newStudentMarks.socialScience}
            onChangeText={(text) =>
              setNewStudentMarks((prevMarks) => ({ ...prevMarks, socialScience: text }))
            }
          />
        </View>
        <Button title="Add Student" onPress={handleAddStudent} />
      </View>
      <Text style={styles.subtitle}>Student Table</Text>
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Tamil</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>English</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Maths</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Science</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Social</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.tableHeaderCell}>Actions</Text>
          </View>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderStudentTable(item)}
            ItemSeparatorComponent={() => <View style={styles.tableRowSeparator} />}
          />
        </View>
      </ScrollView>
      {editingStudentId && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Student Name"
            value={editingStudentName}
            onChangeText={(text) => setEditingStudentName(text)}
          />
          <View style={styles.marksContainer}>
            <TextInput
              style={styles.marksInput}
              placeholder="Tamil"
              value={editingStudentMarks.tamil}
              onChangeText={(text) =>
                setEditingStudentMarks((prevMarks) => ({ ...prevMarks, tamil: text }))
              }
            />
            <TextInput
              style={styles.marksInput}
              placeholder="English"
              value={editingStudentMarks.english}
              onChangeText={(text) =>
                setEditingStudentMarks((prevMarks) => ({ ...prevMarks, english: text }))
              }
            />
            <TextInput
              style={styles.marksInput}
              placeholder="Maths"
              value={editingStudentMarks.maths}
              onChangeText={(text) =>
                setEditingStudentMarks((prevMarks) => ({ ...prevMarks, maths: text }))
              }
            />
            <TextInput
              style={styles.marksInput}
              placeholder="Science"
              value={editingStudentMarks.science}
              onChangeText={(text) =>
                setEditingStudentMarks((prevMarks) => ({ ...prevMarks, science: text }))
              }
            />
            <TextInput
              style={styles.marksInput}
              placeholder="Social Science"
              value={editingStudentMarks.socialScience}
              onChangeText={(text) =>
                setEditingStudentMarks((prevMarks) => ({ ...prevMarks, socialScience: text }))
              }
            />
          </View>
          <Button title="Save Changes" onPress={handleEditStudent} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  marksContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  marksInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    
  },
  table: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,

  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tableRowSeparator: {
    height: 1,
    backgroundColor: 'gray',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  // tableButtons: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft:20,
  //   marginRight:20,
   
  // },
  
});

export default TableListScreen;


