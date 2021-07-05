using UnityEngine;

public class someClass : MonoBehaviour {



    private void Start() {
        
    }

    private void Update() {
        // rotate gameobject around X axis
        transform.Rotate(Vector3.right * Time.deltaTime * 5);
           
    }

}