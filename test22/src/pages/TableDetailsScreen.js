import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { db } from "../firebase";

const TableDetailsScreen = ({ route }) => {
  const { tableId } = route.params;
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [tamilMarks, setTamilMarks] = useState('');
  const [englishMarks, setEnglishMarks] = useState('');
  const [mathsMarks, setMathsMarks] = useState('');
  const [scienceMarks, setScienceMarks] = useState('');
  const [socialMarks, setSocialMarks] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const tableSnapshot = await db.collection('tables').doc(tableId).get();
        const tableData = tableSnapshot.data();
        
        if (tableData && tableData.students) {
          const fetchedStudents = [];
          for (const studentId of tableData.students) {
            const studentSnapshot = await db.collection('students').doc(studentId).get();
            const studentData = studentSnapshot.data();
            fetchedStudents.push({ id: studentSnapshot.id, ...studentData });
          }
          setStudents(fetchedStudents);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    try {
      const newStudent = {
        name,
        marks: {
          tamil: tamilMarks,
          english: englishMarks,
          maths: mathsMarks,
          science: scienceMarks,
          social: socialMarks,
        },
        total: parseInt(tamilMarks) + parseInt(englishMarks) + parseInt(mathsMarks) + parseInt(scienceMarks) + parseInt(socialMarks),
      };

      const studentRef = await db.collection('students').add(newStudent);
      const studentId = studentRef.id;

      await db.collection('tables').doc(tableId).update({
        students: students.concat(studentId),
      });

      console.log('New student added with ID:', studentId);
      setName('');
      setTamilMarks('');
      setEnglishMarks('');
      setMathsMarks('');
      setScienceMarks('');
      setSocialMarks('');
    } catch (error) {
      console.error('Error adding new student:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Table Details</Text>
      {students.map((student) => (
        <View key={student.id} style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text>{student.name}</Text>
          <Text style={styles.label}>Marks:</Text>
          <Text>Tamil: {student.marks.tamil}</Text>
          <Text>English: {student.marks.english}</Text>
          <Text>Maths: {student.marks.maths}</Text>
          <Text>Science: {student.marks.science}</Text>
          <Text>Social: {student.marks.social}</Text>
          <Text style={styles.label}>Total:</Text>
          <Text>{student.total}</Text>
        </View>
      ))}
      <Text style={styles.title}>Add Student</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Tamil Marks"
        value={tamilMarks}
        onChangeText={setTamilMarks}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="English Marks"
        value={englishMarks}
        onChangeText={setEnglishMarks}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Maths Marks"
        value={mathsMarks}
        onChangeText={setMathsMarks}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Science Marks"
        value={scienceMarks}
        onChangeText={setScienceMarks}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Social Marks"
        value={socialMarks}
        onChangeText={setSocialMarks}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add Student" onPress={handleAddStudent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});

export default TableDetailsScreen;

